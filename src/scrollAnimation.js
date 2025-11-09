
  
  const stepsTrack = document.getElementById("steps-track");
  const steps = document.querySelectorAll(".step");
  const stepDots = document.querySelectorAll(".step-dot");

  
  const prevBtn = document.querySelector(".step-nav.prev");
  const nextBtn = document.querySelector(".step-nav.next");
  const howItWorksSection = document.getElementById("how-it-works");

  let currentStep = 0;
  let isScrolling = false;
  let hasInteracted = false;
  let gap = 64; 

  function centerStep(index) {
    currentStep = index;

    // Adjust gap based on screen size
    if (window.innerWidth <= 576) {
      gap = 16;
    } else if (window.innerWidth <= 768) {
      gap = 32;
    } else {
      gap = 64;
    }

    const containerWidth = document.querySelector(".steps-container").offsetWidth;
    const stepWidth = steps[0].offsetWidth;
    const centerPosition = containerWidth / 2 - stepWidth / 2 - index * (stepWidth + gap);

    // Add smooth transition
    stepsTrack.style.transition = "transform 0.3s ease-out";
    stepsTrack.style.transform = `translateX(${centerPosition}px)`;

    // Update active states with a slight delay for visual feedback
    setTimeout(() => {
      steps.forEach((step, i) => {
        if (i === index) {
          step.classList.add("active");
          step.style.transition = "all 0.3s ease-out";
          step.style.transform = "scale(1.02)";
        } else {
          step.classList.remove("active");
          step.style.transform = "scale(1)";
        }
      });

      stepDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }, 50);

    // Remove transition after animation completes
    setTimeout(() => {
      stepsTrack.style.transition = "";
    }, 300);
  }

  centerStep(0);


  function handleVerticalScroll(e) {
    const rect = howItWorksSection.getBoundingClientRect();


    if (rect.top > 1 || rect.bottom < window.innerHeight - 1) {
      return; // Not in view, allow normal scroll
    }

    const delta = Math.sign(e.deltaY);


    if (delta > 0 && currentStep === steps.length - 1) {

      if (!isScrolling) {
        return;
      }
    }

    if (delta < 0 && currentStep === 0) {
   
      if (!isScrolling) {
        return;
      }
    }

  
    e.preventDefault();

  
    if (isScrolling) return;

  
    let newStep = currentStep;
    if (delta > 0 && currentStep < steps.length - 1) {
      newStep++;
    } else if (delta < 0 && currentStep > 0) {
      newStep--;
    } else {
      return; 
    }

 
    isScrolling = true;
    centerStep(newStep);

    setTimeout(() => {
      isScrolling = false;
    }, 800); 
  }

  window.addEventListener("wheel", handleVerticalScroll, { passive: false });

  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  howItWorksSection.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    },
    { passive: true }
  );

  howItWorksSection.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault(); // Prevent default scrolling while in the section
      
      const rect = howItWorksSection.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        return;
      }

      if (isScrolling) return;

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchStartX - touchX;
      const deltaY = touchStartY - touchY;
      const timeDiff = Date.now() - touchStartTime;

      // Check if the swipe is more horizontal than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > 50 && timeDiff < 300) { // Fast swipe
          if (deltaX > 0 && currentStep < steps.length - 1) {
            // Swipe left, go to next
            handleInteraction();
            isScrolling = true;
            centerStep(currentStep + 1);
          } else if (deltaX < 0 && currentStep > 0) {
            // Swipe right, go to previous
            handleInteraction();
            isScrolling = true;
            centerStep(currentStep - 1);
          }
          
          touchStartX = touchX;
          touchStartY = touchY;
          touchStartTime = Date.now();

          setTimeout(() => {
            isScrolling = false;
          }, 500); // Reduced cooldown for touch
        }
      }
    },
    { passive: false }
  );

  // Add touch end handler for better gesture control
  howItWorksSection.addEventListener(
    "touchend",
    (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchStartX - touchEndX;
      const timeDiff = Date.now() - touchStartTime;

      // Handle slower swipes on touch end
      if (Math.abs(deltaX) > 100 && timeDiff < 1000 && !isScrolling) {
        if (deltaX > 0 && currentStep < steps.length - 1) {
          handleInteraction();
          centerStep(currentStep + 1);
        } else if (deltaX < 0 && currentStep > 0) {
          handleInteraction();
          centerStep(currentStep - 1);
        }
      }
    },
    { passive: true }
  );

  document.addEventListener("keydown", (e) => {
    const rect = howItWorksSection.getBoundingClientRect();
    if (rect.top > 1 || rect.bottom < window.innerHeight - 1) {
      return; 
    }

    if (isScrolling) return;

    
    if (e.key === "ArrowDown" && currentStep === steps.length - 1) {
      return; 
    }
   
    if (e.key === "ArrowUp" && currentStep === 0) {
      return; 
    }

    let newStep = currentStep;
    if (e.key === "ArrowDown" && currentStep < steps.length - 1) {
      newStep++;
    } else if (e.key === "ArrowUp" && currentStep > 0) {
      newStep--;
    } else {
      return; 
    }

    e.preventDefault();
    handleInteraction();
    isScrolling = true;
    centerStep(newStep);

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  });

  // Navigation buttons
  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      handleInteraction();
      centerStep(currentStep - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      handleInteraction();
      centerStep(currentStep + 1);
    }
  });

  // Progress dots navigation
  stepDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"));
      handleInteraction();
      centerStep(index);
    });
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    centerStep(currentStep);
  });

