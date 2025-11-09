
  
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

    if (window.innerWidth <= 576) {
      gap = 16;
    } else {
      gap = 64; 
    }

    const containerWidth =
      document.querySelector(".steps-container").offsetWidth;
    const stepWidth = steps[0].offsetWidth;
    const centerPosition =
      containerWidth / 2 - stepWidth / 2 - index * (stepWidth + gap);

    stepsTrack.style.transform = `translateX(${centerPosition}px)`;

    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });

    stepDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

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

  let touchStartY = 0;

  howItWorksSection.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  howItWorksSection.addEventListener(
    "touchmove",
    (e) => {
      const rect = howItWorksSection.getBoundingClientRect();

      if (rect.top > 1 || rect.bottom < window.innerHeight - 1) {
        return;
      }

      if (isScrolling) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (Math.abs(deltaY) > 30) {
       
        if (deltaY > 0 && currentStep === steps.length - 1) {
          return; 
        }
       
        if (deltaY < 0 && currentStep === 0) {
          return; 
        }

        handleInteraction();

        let newStep = currentStep;
        if (deltaY > 0) {
          newStep++;
        } else {
          newStep--;
        }

        e.preventDefault();
        isScrolling = true;
        centerStep(newStep);
        touchStartY = touchY;

        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    },
    { passive: false }
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

