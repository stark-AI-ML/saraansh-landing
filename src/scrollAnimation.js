
  
  const stepsTrack = document.getElementById("steps-track");
  const steps = document.querySelectorAll(".step");
  const stepDots = document.querySelectorAll(".step-dot");

  //   const scrollIndicator = document.getElementById('scroll-indicator');

  const prevBtn = document.querySelector(".step-nav.prev");
  const nextBtn = document.querySelector(".step-nav.next");
  const howItWorksSection = document.getElementById("how-it-works");

  let currentStep = 0;
  let isScrolling = false;
  let hasInteracted = false;
  let gap = 64; // 4rem

  function centerStep(index) {
    // 🐞 THE FIX: Update currentStep immediately
    // This stops multiple scrolls from queuing up and skipping the last step.
    currentStep = index;

    if (window.innerWidth <= 576) {
      gap = 16; // 1rem
    } else {
      gap = 64; // 4rem
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

    // Note: 'currentStep = index;' was moved from here to the top.

    // scrollIndicator.classList.toggle('hidden', currentStep === steps.length - 1 || hasInteracted);
  }

  centerStep(0);

  //   function handleInteraction() {
  //     if (!hasInteracted) {
  //       hasInteracted = true;
  //       scrollIndicator.classList.add('hidden');
  //     }
  //   }

  function handleVerticalScroll(e) {
    const rect = howItWorksSection.getBoundingClientRect();

    // 1. Check if we are in the section
    if (rect.top > 1 || rect.bottom < window.innerHeight - 1) {
      return; // Not in view, allow normal scroll
    }

    const delta = Math.sign(e.deltaY);

    // 2. Check for boundary conditions
    if (delta > 0 && currentStep === steps.length - 1) {
      // At last step, scrolling down.
      // If we are *not* currently animating, allow normal scroll.
      if (!isScrolling) {
        return;
      }
    }

    if (delta < 0 && currentStep === 0) {
      // At first step, scrolling up.
      // If we are *not* currently animating, allow normal scroll.
      if (!isScrolling) {
        return;
      }
    }

    // 3. If we are here, we are *not* at a boundary *or* we are animating.
    // We *must* prevent default to stop the page from scrolling while we animate cards.
    e.preventDefault();

    // 4. If we are currently animating, don't stack another scroll.
    if (isScrolling) return;

    // 5. We are not at a boundary and not animating. Time to change steps.
    let newStep = currentStep;
    if (delta > 0 && currentStep < steps.length - 1) {
      newStep++;
    } else if (delta < 0 && currentStep > 0) {
      newStep--;
    } else {
      return; // This should no longer be hit, but good to have.
    }

    // handleInteraction();
    isScrolling = true;
    centerStep(newStep);

    setTimeout(() => {
      isScrolling = false;
    }, 800); // Cooldown
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
        // Boundary check (swiping up)
        if (deltaY > 0 && currentStep === steps.length - 1) {
          return; // On last step, swiping up: allow normal page scroll
        }
        // Boundary check (swiping down)
        if (deltaY < 0 && currentStep === 0) {
          return; // On first step, swiping down: allow normal page scroll
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
      return; // Not in view
    }

    if (isScrolling) return;

    // Boundary check (down key)
    if (e.key === "ArrowDown" && currentStep === steps.length - 1) {
      return; // On last step, pressing down: allow normal page scroll
    }
    // Boundary check (up key)
    if (e.key === "ArrowUp" && currentStep === 0) {
      return; // On first step, pressing up: allow normal page scroll
    }

    let newStep = currentStep;
    if (e.key === "ArrowDown" && currentStep < steps.length - 1) {
      newStep++;
    } else if (e.key === "ArrowUp" && currentStep > 0) {
      newStep--;
    } else {
      return; // Not a key we care about
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

