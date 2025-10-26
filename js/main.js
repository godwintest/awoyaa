// Main JavaScript file for Awoyaa website

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Initialize all components
  initializeNavigation();
  initializeFAQAccordion();
  initializeContactForm();
  initializeDemoForm();
  initializePricingToggle();
  initializeScrollAnimations();
  initializeNewsletterForm();
});

// Navigation functionality
function initializeNavigation() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mainMenu = document.getElementById("main-menu");
  const header = document.getElementById("site-header");

  // Mobile menu toggle
  if (mobileMenuToggle && mainMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      mainMenu.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });
  }

  // Header scroll effect
  if (header) {
    let lastScroll = 0;
    window.addEventListener("scroll", function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.classList.add("scrolled");
        if (currentScroll > lastScroll) {
          header.classList.add("scroll-down");
        } else {
          header.classList.remove("scroll-down");
        }
      } else {
        header.classList.remove("scrolled");
      }

      lastScroll = currentScroll;
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Skip if it's just "#"
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Close mobile menu if open
        if (mainMenu && mainMenu.classList.contains("active")) {
          mainMenu.classList.remove("active");
          mobileMenuToggle.classList.remove("active");
        }

        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

// FAQ Accordion functionality
function initializeFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (question && answer) {
      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // Close all items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active");
            otherItem.querySelector(".faq-answer").style.maxHeight = null;
          }
        });

        // Toggle clicked item
        item.classList.toggle("active");

        // Animate answer height
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
          answer.style.maxHeight = null;
        }
      });
    }
  });

  // FAQ Search functionality
  const searchInput = document.getElementById("faqSearch");

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(function () {
        const searchTerm = this.value.toLowerCase();

        faqItems.forEach((item) => {
          const questionText = item
            .querySelector(".faq-question h3")
            .textContent.toLowerCase();
          const answerText = item
            .querySelector(".faq-answer")
            .textContent.toLowerCase();

          if (
            questionText.includes(searchTerm) ||
            answerText.includes(searchTerm)
          ) {
            item.style.display = "block";
            item.classList.add("fade-in");
          } else {
            item.style.display = "none";
            item.classList.remove("fade-in");
          }
        });
      }, 300)
    );
  }
}

// Contact Form functionality
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");
  const sendAnother = document.getElementById("send-another");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateForm(contactForm)) {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML =
          '<span class="loading-spinner"></span> Sending...';

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
          if (formSuccess) {
            contactForm.style.display = "none";
            formSuccess.classList.remove("hidden");
            formSuccess.classList.add("fade-in");
          }

          // Reset button state
          submitButton.disabled = false;
          submitButton.innerHTML = "Send Message";
        }, 1500);
      }
    });
  }

  if (sendAnother) {
    sendAnother.addEventListener("click", function () {
      if (contactForm && formSuccess) {
        formSuccess.classList.add("hidden");
        formSuccess.classList.remove("fade-in");
        contactForm.style.display = "block";
        contactForm.reset();
      }
    });
  }
}

// Shared form validation functions
function validateForm(form) {
  // Basic validation to check for empty required fields
  let isValid = true;
  const inputs = form.querySelectorAll("[required]");

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      showError(input, "This field is required.");
    } else {
      // Clear any existing error messages
      const existingError = input.parentElement.querySelector(".error-message");
      if (existingError) {
        existingError.remove();
      }
    }
  });

  return isValid;
}

function showError(input, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  // Prevent duplicate error messages
  const existingError = input.parentElement.querySelector(".error-message");
  if (!existingError) {
    input.parentElement.appendChild(errorDiv);
  }
}

// Pricing toggle functionality
function initializePricingToggle() {
  const billingToggle = document.getElementById("billing-toggle");
  const prices = document.querySelectorAll(".price");
  const periods = document.querySelectorAll(".period");

  if (billingToggle) {
    billingToggle.addEventListener("change", function () {
      const isAnnual = this.checked;

      prices.forEach((price) => {
        const monthlyPrice = price.getAttribute("data-monthly");
        const annualPrice = price.getAttribute("data-annual");

        // Animate price change
        price.style.transform = "translateY(-10px)";
        price.style.opacity = "0";

        setTimeout(() => {
          price.textContent = isAnnual ? annualPrice : monthlyPrice;
          price.style.transform = "translateY(0)";
          price.style.opacity = "1";
        }, 200);
      });

      periods.forEach((period) => {
        period.textContent = isAnnual ? "/month (billed annually)" : "/month";
      });
    });
  }
}

// Scroll animations
function initializeScrollAnimations() {
  // Add smooth reveal animations to elements
  const animatedElements = document.querySelectorAll(
    ".feature-card, .benefit-card, .testimonial-card, .pricing-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated", "fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    animatedElements.forEach((element) => {
      element.classList.add("animated", "fade-in");
    });
  }
}

// Newsletter form functionality
function initializeNewsletterForm() {
  const forms = document.querySelectorAll(".newsletter-form");

  forms.forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector("button");
    let errorMessage = form.querySelector(".error-message");
    let successMessage = form.querySelector(".success-message");

    // Create error message element if it doesn't exist
    if (!errorMessage) {
      errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      form.appendChild(errorMessage);
    }

    // Create success message element if it doesn't exist
    if (!successMessage) {
      successMessage = document.createElement("div");
      successMessage.className = "success-message";
      form.appendChild(successMessage);
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset messages
      errorMessage.textContent = "";
      successMessage.textContent = "";
      input.classList.remove("error");

      const email = input.value.trim();

      // Validate email
      if (!email) {
        showError("Please enter your email address");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError("Please enter a valid email address");
        return;
      }

      // Show loading state
      button.disabled = true;
      const originalButtonText = button.textContent;
      button.innerHTML = '<span class="loading-spinner"></span> Subscribing...';

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Show success message
        showSuccess("Successfully subscribed! Thank you.");
        input.value = "";
      } catch (error) {
        showError("Something went wrong. Please try again.");
      } finally {
        // Reset button state
        button.disabled = false;
        button.textContent = originalButtonText;
      }
    });

    function showError(message) {
      input.classList.add("error");
      errorMessage.textContent = message;
      successMessage.textContent = "";
    }

    function showSuccess(message) {
      input.classList.remove("error");
      errorMessage.textContent = "";
      successMessage.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        ${message}
      `;
    }
  });
}

// Demo Form functionality
function initializeDemoForm() {
  const demoForm = document.getElementById("demo-form");
  if (demoForm) {
    demoForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateForm(demoForm)) {
        const submitButton = demoForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Submitting...';

        // Simulate form submission
        setTimeout(() => {
          // You can add a success message here if you want
          alert("Thank you for your demo request! We will be in touch shortly.");
          demoForm.reset();

          // Reset button state
          submitButton.disabled = false;
          submitButton.innerHTML = "Request Demo";
        }, 1500);
      }
    });
  }
}

// Utility functions
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
