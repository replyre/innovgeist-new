(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 0
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Enhanced Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 400,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
      offset: 120, // Reduced from 200px to trigger earlier
      anchorPlacement: "top-bottom",
      startEvent: "DOMContentLoaded",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
    });

    // Custom scroll handler for better performance
    let ticking = false;

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
      }
    }

    function updateAnimations() {
      AOS.refresh();
      ticking = false;
    }

    // Refresh AOS on window resize for responsive behavior
    window.addEventListener("resize", requestTick);

    // Enhanced timing for specific sections
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: "0px 0px -20% 0px", // Start animation earlier
    };

    // Include services, call-to-action-2, and contact sections in enhanced sections
    const enhancedSections = document.querySelectorAll(
      "#services, #call-to-action-2, #contact, #testimonials, #stats, .metrics-showcase"
    );

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementsToAnimate = entry.target.querySelectorAll("[data-aos]");
          elementsToAnimate.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("aos-animate");
            }, index * 80); // Reduced stagger time for faster appearance
          });
        }
      });
    }, observerOptions);

    enhancedSections.forEach((section) => {
      sectionObserver.observe(section);
    });

    // Special handling for service cards with improved timing
    const serviceCards = document.querySelectorAll(".services .service-card");
    if (serviceCards.length > 0) {
      const serviceObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const serviceCard = entry.target.closest("[data-aos]");
              if (serviceCard) {
                serviceCard.classList.add("aos-animate");
              }
            }
          });
        },
        {
          threshold: 0.2, // Trigger when 20% of service card is visible
          rootMargin: "50px 0px -10% 0px",
        }
      );

      serviceCards.forEach((card) => {
        serviceObserver.observe(card);
      });
    }

    // Special handling for call-to-action-2 section
    const ctaSection = document.querySelector("#call-to-action-2");
    if (ctaSection) {
      const ctaObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const ctaElements = entry.target.querySelectorAll("[data-aos]");
              ctaElements.forEach((el, index) => {
                setTimeout(() => {
                  el.classList.add("aos-animate");
                }, index * 100);
              });
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "50px 0px -15% 0px",
        }
      );

      ctaObserver.observe(ctaSection);
    }

    // Special handling for contact section elements
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const contactObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const contactElements =
                entry.target.querySelectorAll("[data-aos]");
              contactElements.forEach((el, index) => {
                setTimeout(() => {
                  el.classList.add("aos-animate");
                }, index * 120); // Slightly slower for contact form elements
              });
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "80px 0px -10% 0px",
        }
      );

      contactObserver.observe(contactSection);
    }
  }

  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  /**
   * Custom testimonials animation enhancement
   */
  function enhanceTestimonialAnimations() {
    const testimonialItems = document.querySelectorAll(".testimonial-item");

    const testimonialObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.animation =
                "testimonialSlideIn 0.8s ease-out forwards";
            }, index * 150);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "80px 0px -15% 0px", // Improved timing for testimonials
      }
    );

    testimonialItems.forEach((item) => {
      testimonialObserver.observe(item);
    });
  }

  // Initialize testimonial enhancements after DOM is loaded
  document.addEventListener("DOMContentLoaded", enhanceTestimonialAnimations);
})();

/*
* Video Testimonials
*/
document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('[data-video]');
  let swiperInstance = null;

  // Function to get swiper instance
  const getSwiper = () => {
    if (swiperInstance) return swiperInstance;
    const swiperEl = document.querySelector('.video-testimonial-swiper');
    if (swiperEl && swiperEl.swiper) {
      swiperInstance = swiperEl.swiper;
      return swiperInstance;
    }
    return null;
  };

  wrappers.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const btn = wrapper.querySelector('.video-control-btn');
    const icon = btn ? btn.querySelector('i') : null;

    if (!btn || !video) return;

    // ▶ PLAY/PAUSE VIDEO
    btn.addEventListener('click', () => {
      const swiper = getSwiper();
      if (video.paused) {

        // Pause all other videos
        wrappers.forEach(w => {
          const v = w.querySelector('video');
          const i = w.querySelector('.video-control-btn i');
          if (v && v !== video) {
            v.pause();
            v.muted = true;
            if (i) i.className = 'bi bi-play-fill';
            w.classList.remove('is-playing');
          }
        });

        // STOP carousel when video starts playing
        if (swiper && swiper.autoplay) {
          swiper.autoplay.stop();
        }

        video.muted = false;
        video.play();
        if (icon) icon.className = 'bi bi-pause-fill';
        wrapper.classList.add('is-playing');

      } else {

        // ⏸ PAUSE VIDEO
        video.pause();
        video.muted = true;
        if (icon) icon.className = 'bi bi-play-fill';
        wrapper.classList.remove('is-playing');

        // ▶ RESUME carousel when video is paused
        if (swiper && swiper.autoplay) {
          swiper.autoplay.start();
        }
      }
    });

    // ▶ WHEN VIDEO ENDS → RESUME CAROUSEL
    video.addEventListener('ended', () => {
      wrapper.classList.remove('is-playing');
      if (icon) icon.className = 'bi bi-play-fill';

      const swiper = getSwiper();
      if (swiper && swiper.autoplay) {
        swiper.autoplay.start();
      }
    });
  });
});
