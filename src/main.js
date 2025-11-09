import  {AuthHandler}  from "../public/firebaseLogin"; 


document.addEventListener("DOMContentLoaded", function () {
  //firebaseLogin
    const authHandler = new AuthHandler(); 

  authHandler.onAuthChange((user) => {
    console.log("Auth state restored:", user?.displayName || "No user");


    document.querySelectorAll(".getStartedBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (authHandler.isSignedIn()) {
          window.location.href = "./downloadZip.html";
        } else {
          e.preventDefault();
          window.location.href = "/onboard.html";
        }
      });
    });
  });


  // Initialize GSAP plugins
  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined")
      gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollToPlugin !== "undefined")
      gsap.registerPlugin(ScrollToPlugin);
  }

  // Header scroll effect
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  let menuOpen = false;

  if (mobileMenuToggle && navMenu) {
    const navLinks = navMenu.querySelectorAll("li");

    mobileMenuToggle.addEventListener("click", function () {
      menuOpen = !menuOpen;
      this.classList.toggle("active", menuOpen);
      navMenu.classList.toggle("active", menuOpen);

      if (menuOpen) {
        // Animate menu items with anime.js
        anime({
          targets: navLinks,
          translateY: [20, 0],
          opacity: [0, 1],
          delay: anime.stagger(100),
          easing: "easeOutCubic",
          duration: 500,
        });
      } else {
        // Hide menu items with anime.js
        anime({
          targets: navLinks,
          translateY: [0, 20],
          opacity: [1, 0],
          delay: anime.stagger(50),
          easing: "easeInCubic",
          duration: 300,
        });
      }
    });

    // Close menu when clicking on links
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (menuOpen) {
          menuOpen = false;
          mobileMenuToggle.classList.remove("active");
          navMenu.classList.remove("active");
        }
      });
    });
  }

  // Tab functionality
  const tabs = document.querySelectorAll(".tab");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const tabMarker = document.querySelector(".tab-marker");

  function activateTab(tabElement) {
    const targetTabId = tabElement.getAttribute("data-tab");

    // Update tabs
    tabs.forEach((t) => t.classList.remove("active"));
    tabElement.classList.add("active");

    // Update tab panes
    tabPanes.forEach((p) => p.classList.remove("active"));
    document.getElementById(`${targetTabId}-tab`).classList.add("active");

    // Move marker with GSAP
    if (tabMarker) {
      gsap.to(tabMarker, {
        duration: 0.5,
        ease: "power3.inOut",
        width: tabElement.offsetWidth,
        left: tabElement.offsetLeft,
      });
    }

    // Animate content with anime.js
    const activePane = document.getElementById(`${targetTabId}-tab`);
    const featureItems = activePane.querySelectorAll(".feature-item");

    anime({
      targets: featureItems,
      translateX: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      easing: "easeOutCubic",
      duration: 600,
    });
  }

  // Initialize tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      activateTab(this);
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (menuOpen && mobileMenuToggle) {
          menuOpen = false;
          mobileMenuToggle.classList.remove("active");
          navMenu.classList.remove("active");
        }

        // Scroll to element with GSAP
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: targetElement, offsetY: 70 },
          ease: "power2.inOut",
        });
      }
    });
  });

  // Demo video
  const videoThumbnail = document.getElementById("video-thumbnail");
  const iframeContainer = document.getElementById("video-iframe-container");

  if (videoThumbnail && iframeContainer) {
    videoThumbnail.addEventListener("click", function () {
      // const videoId = "W54Y0cn78NY";
      const videoId = "f413WmN7Yf4"; 
      // Create iframe element safely
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.allow = "autoplay; encrypted-media";
      iframe.allowFullscreen = true;

      // Clear container and append iframe
      iframeContainer.textContent = "";
      iframeContainer.appendChild(iframe);

      // Check if GSAP is available
      if (typeof gsap !== "undefined") {
        gsap.to(videoThumbnail, {
          duration: 0.5,
          opacity: 0,
          onComplete: () => {
            videoThumbnail.style.display = "none";
            iframeContainer.style.display = "block";
            gsap.fromTo(
              iframeContainer,
              { opacity: 0, scale: 0.9 },
              {
                duration: 0.7,
                opacity: 1,
                scale: 1,
                ease: "back.out(1.7)",
              }
            );
          },
        });
      } else {
        // Fallback if GSAP is not loaded
        videoThumbnail.style.display = "none";
        iframeContainer.style.display = "block";
      }
    });
  }

  // Back to top button
  const backToTopBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: "power2.inOut",
    });
  });

  // GSAP Animations

  // Hero animations
  if (typeof gsap !== "undefined") {
    const heroTimeline = gsap.timeline();

    // Animate logo and navigation
    heroTimeline
      .from(".logo", {
        duration: 0.8,
        y: -30,
        opacity: 0,
        ease: "power2.out",
      })
      .from(
        "nav li",
        {
          duration: 0.6,
          y: -30,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        ".header-cta",
        {
          duration: 0.6,
          y: -30,
          opacity: 0,
          ease: "power2.out",
        },
        "-=0.4"
      );

    // Animate hero content with anime.js
    anime({
      targets: ".hero h1 .char",
      translateY: [100, 0],
      opacity: [0, 1],
      delay: anime.stagger(30),
      easing: "easeOutCubic",
      duration: 800,
    });

    gsap.from(".hero p", {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.8,
      ease: "power2.out",
    });

    gsap.from(".hero-cta", {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 1,
      ease: "power2.out",
    });

    // Animate feature cards with anime.js
    anime({
      targets: ".feature-card",
      translateY: [60, 0],
      opacity: [0, 1],
      delay: anime.stagger(200),
      easing: "easeOutCubic",
      duration: 800,
    });

    // Animate blob backgrounds with GSAP
    gsap.to(".blob-1", {
      duration: 20,
      x: 100,
      y: 100,
      rotation: 360,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".blob-2", {
      duration: 25,
      x: -80,
      y: -80,
      rotation: -360,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".blob-3", {
      duration: 18,
      x: 60,
      y: -60,
      rotation: 180,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Section animations with ScrollTrigger
    if (typeof ScrollTrigger !== "undefined") {
      // Features section
      gsap.from(".section-header", {
        scrollTrigger: {
          trigger: ".features",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(".tabs-container", {
        scrollTrigger: {
          trigger: ".tabs-container",
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // Demo section
      gsap.from(".demo-container", {
        scrollTrigger: {
          trigger: ".demo",
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // How it works section
      // gsap.from(".steps-container", {
      //   scrollTrigger: {
      //     trigger: ".how-it-works",
      //     start: "top 70%",
      //     end: "bottom 20%",
      //     toggleActions: "play none none reverse",
      //   },
      //   y: 50,
      //   opacity: 0,
      //   duration: 1,
      //   ease: "power2.out",
      // });

      // // Animate steps with anime.js
      // const steps = document.querySelectorAll(".step");
      // anime({
      //   targets: steps,
      //   translateY: [60, 0],
      //   opacity: [0, 1],
      //   delay: anime.stagger(200),
      //   easing: "easeOutCubic",
      //   duration: 800,
      //   scrollTrigger: {
      //     trigger: ".steps",
      //     start: "top 80%",
      //     end: "bottom 20%",
      //     toggleActions: "play none none reverse",
      //   },
      // });

      // // Animated progress line
      // const progressLine = document.querySelector(".steps-line-progress");
      // if (progressLine) {
      //   gsap.to(progressLine, {
      //     scrollTrigger: {
      //       trigger: ".steps-container",
      //       start: "top 70%",
      //       end: "bottom top",
      //       scrub: 1,
      //     },
      //     width: "100%",
      //     ease: "none",
      //   });
      // }

      // Demo video parallax effect
    
      const demoVideo = document.querySelector(".demo-video-wrapper");
      if (demoVideo) {
        gsap.to(demoVideo, {
          scrollTrigger: {
            trigger: ".demo",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: -100,
          ease: "none",
        });
      }
    }

    // Feature cards hover effects with anime.js
    document.querySelectorAll(".feature-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        anime({
          targets: this,
          translateY: -10,
          scale: 1.05,
          duration: 300,
          easing: "easeOutCubic",
        });
      });

      card.addEventListener("mouseleave", function () {
        anime({
          targets: this,
          translateY: 0,
          scale: 1,
          duration: 300,
          easing: "easeOutCubic",
        });
      });
    });

    // Button hover effects with anime.js
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("mouseenter", function () {
        anime({
          targets: this,
          translateY: -3,
          duration: 200,
          easing: "easeOutCubic",
        });
      });

      button.addEventListener("mouseleave", function () {
        anime({
          targets: this,
          translateY: 0,
          duration: 200,
          easing: "easeOutCubic",
        });
      });
    });

    // Feature icons animation with anime.js
    document.querySelectorAll(".feature-icon").forEach((icon) => {
      icon.addEventListener("mouseenter", function () {
        anime({
          targets: this,
          rotate: "1turn",
          scale: 1.2,
          duration: 500,
          easing: "easeOutCubic",
        });
      });

      icon.addEventListener("mouseleave", function () {
        anime({
          targets: this,
          rotate: "0turn",
          scale: 1,
          duration: 300,
          easing: "easeOutCubic",
        });
      });
    });

    // Footer animations with GSAP
    gsap.from(".footer-content > *", {
      scrollTrigger: {
        trigger: "footer",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
    });
    // Refresh ScrollTrigger if it exists
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }

    console.log("Saraansh animations loaded successfully!");
  }

})