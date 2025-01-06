console.clear();

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const descriptionInput = document.getElementById("description");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const captchaValue = document.getElementById("captchaValue");
  const captchaInput = document.getElementById("captchaInput");
  const countryInput = document.getElementById("country");
  const form = document.getElementById("contactForm");
  const wordCountElement = document.getElementById("wordCount");
  const refreshCaptchaBtn = document.getElementById("refreshCaptcha");

  // Get modal and close button
  const modal = document.getElementById("errorModal");
  const closeModalBtn = document.querySelector(".close-btn");
  const errorMessage = document.getElementById("errorMessage");

  // Function to show the modal with a custom message
  function showErrorModal(message) {
    errorMessage.textContent = message;
    modal.style.display = "block";
  }

  // Function to close the modal
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal if the user clicks anywhere outside the modal
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Function to generate random CAPTCHA
  function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) { // 6 characters CAPTCHA
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    captchaValue.textContent = captcha; // Display CAPTCHA in the box
  }

  // Function to validate the CAPTCHA input
  function validateCaptcha() {
    const captchaInputValue = document.getElementById('captchaInput').value;
    const captchaValueText = document.getElementById('captchaValue').textContent;
    if (captchaInputValue !== captchaValueText) {
      showErrorModal("Incorrect CAPTCHA. Please try again.");
      generateCaptcha(); // Refresh CAPTCHA on incorrect entry
      return false;
    }
    return true;
  }

  // Refresh CAPTCHA when button is clicked
  refreshCaptchaBtn.addEventListener('click', function () {
    generateCaptcha();
    captchaInput.value = ''; // Clear input field
  });

  // Initialize the CAPTCHA when the page loads
  window.onload = function () {
    generateCaptcha();
  };

  // Validate Email Format (Under 90 characters)
  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = emailInput.value;
    // Check if email matches the regex pattern
    if (!emailRegex.test(emailValue)) {
      showErrorModal("Invalid email format. Please enter a valid email address (e.g., user@example.com).");
      emailInput.focus();
      return false;
    }
    return true;
  }

  // Validate Phone Number
  function validatePhone() {
    const phoneRegex = /^[+]?[0-9]+$/;
    if (!phoneRegex.test(phoneInput.value)) {
      showErrorModal("Phone number must contain only digits and an optional '+' prefix.");
      phoneInput.focus();
      return false;
    }
    return true;
  }

  // Validate Description (Word Count & Length)
  function validateDescription() {
    const wordCount = descriptionInput.value.split(/\s+/).length;
    wordCountElement.textContent = `Word Count: ${wordCount}/200`;
    if (wordCount > 200) {
      showErrorModal("Description exceeds 200 words.");
      descriptionInput.focus();
      return false;
    }
    return true;
  }

  // Validate Password Strength
  function validatePasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

    if (!password.match(passwordStrengthRegex)) {
      showErrorModal("Password must contain at least 1 uppercase letter, 1 number, and 1 special character, and be between 8 and 30 characters.");
      passwordInput.focus();
      return false;
    }

    if (password !== confirmPassword) {
      showErrorModal("Passwords do not match.");
      confirmPasswordInput.focus();
      return false;
    }

    return true;
  }


  // Real-time Validation
  emailInput.addEventListener("blur", validateEmail);
  phoneInput.addEventListener("blur", validatePhone);
  descriptionInput.addEventListener("blur", validateDescription);
  passwordInput.addEventListener("blur", validatePasswords);
  confirmPasswordInput.addEventListener("blur", validatePasswords);

  // Prevent form submission if any validation fails
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let valid = true;
    if (!validateEmail()) valid = false;
    if (!validatePhone()) valid = false;
    if (!validateDescription()) valid = false;
    if (!validatePasswords()) valid = false;
    if (!validateCaptcha()) valid = false;

    if (!valid) {
      showErrorModal("Please fix the errors before submitting.");
    } else {
      alert("Your information has been successfully submitted!");
      // Prepare email content
      const subject = encodeURIComponent("New Contact Form Submission From portfoio");
      const body = encodeURIComponent(
        `You have received a new message:\n\nEmail: ${email}\nPhone: ${phone}\nMessage: ${description}`
      );

      // Use `mailto:` to open the email client
      const mailtoLink = `mailto:ganeshdholi88@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;

      // Reset the form and refresh CAPTCHA without opening any new window
      setTimeout(function () {
        window.location.reload();  // Refresh the page
      }, 2000);  // Give it a small delay before refreshing to allow `mailto` action
    }
  });

// Toggle Password Visibility
document.querySelectorAll(".toggle-password").forEach(toggle => {
  toggle.addEventListener("click", function () {
    const target = document.querySelector(`input[name="${this.dataset.toggle}"]`);
    const type = target.getAttribute("type") === "password" ? "text" : "password";
    target.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
  });
});
});



// Get all navigation links inside the offcanvas
const navLinks = document.querySelectorAll('#offcanvasNavbar .nav-link');
const offcanvas = document.querySelector('#offcanvasNavbar');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
    if (offcanvasInstance) {
      offcanvasInstance.hide(); // Close the offcanvas menu
    }
  });
});

// Function to get the bounding rectangle of an element
const elResizer = document.querySelector('#resizer');
const elChar = document.querySelector('.i');
const elRes = document.querySelector('.res');
const elZer = document.querySelector('.zer');
const getRect = (el) => {
  return el.getBoundingClientRect();
};

/**
 * FLIP Animation
 * F = First
 * L = Last
 * I = Invert
 * P = Play
 */
function flip(doSomething, firstEls, getLastEls = () => firstEls) {
  const firstRects = firstEls.map(getRect); // First

  requestAnimationFrame(() => {
    doSomething(); // Do something that changes the layout

    let lastEls = getLastEls(); // Last
    lastEls.forEach((lastEl, i) => {
      const firstRect = firstRects[i];
      const lastRect = getRect(lastEl);

      // Invert
      const dx = lastRect.x - firstRect.x;
      const dy = lastRect.y - firstRect.y;
      const dw = lastRect.width / firstRect.width;
      const dh = lastRect.height / firstRect.height;

      lastEl.dataset.flipping = true; // Mark for flip
      lastEl.style.setProperty("--dx", dx);
      lastEl.style.setProperty("--dy", dy);
      lastEl.style.setProperty("--dw", dw);
      lastEl.style.setProperty("--dh", dh);
      lastEl.style.setProperty("--w", lastRect.width);
    });

    requestAnimationFrame(() => {
      lastEls.forEach(lastEl => delete lastEl.dataset.flipping); // Play
    });
  });
}

// Typewriter effect for rotating roles
document.addEventListener('DOMContentLoaded', () => {
  const textElement = document.getElementById("animated-text");
  const roles = ["Security Expert", "DevOps Aspirant", "Frontend Developer"];
  let index = 0;

  function typeWriterEffect(text, callback) {
    let charIndex = 0;
    textElement.innerHTML = "";
    const interval = setInterval(() => {
      textElement.innerHTML += text.charAt(charIndex);
      charIndex++;
      if (charIndex === text.length) {
        clearInterval(interval);
        setTimeout(callback, 1000);
      }
    }, 100);
  }

  function cycleRoles() {
    typeWriterEffect(roles[index], () => {
      index = (index + 1) % roles.length;
      cycleRoles();
    });
  }

  cycleRoles(); // Start animation
});

// Typewriter effect for another text
const text = "Optimizing Workflows, Automating Processes, and Enhancing System Efficiency.";
const container = document.querySelector(".text-blk.subHeadingText.subHeadinganimation");
let index2 = 0;
let cycleCount = 0;
const maxCycles = 3;

function typeEffect() {
  if (index2 < text.length) {
    container.textContent += text.charAt(index2);
    index2++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(() => {
      cycleCount++;
      if (cycleCount < maxCycles) {
        index2 = 0;
        container.textContent = "";
        typeEffect();
      }
    }, 2000);
  }
}

typeEffect();

// Add event listener for the "About" link
document.querySelector('a[href="#About"]').addEventListener('click', () => {
  index2 = 0;
  cycleCount = 0;
  container.textContent = "";
  typeEffect();
});

// Skill bar animation
// Skill bar animation
$(document).ready(function () {
  $('.skill-per').each(function () {
    var $this = $(this);
    var percentage = $this.attr('percentage');

    // Add a 2-second delay before starting the animation
    setTimeout(function () {
      // Animate the width of the skill bar
      $this.animate(
        { width: percentage + '%' },
        {
          duration: 1500,
          step: function (now) {
            // Update the percentage value during the animation
            $this.attr('percentage', Math.floor(now));
          },
        }
      );
    }, 1000); // 2-second delay
  });

  // Re-trigger skill bar animation on navbar link click
  $('a[href="#skills-page"]').on('click', function () {
    $('.skill-per').css('width', '0'); // Reset widths
    $('.skill-per').each(function () {
      var $this = $(this);
      var percentage = $this.attr('percentage');

      // Animate the width of the skill bar
      $this.animate(
        { width: percentage + '%' },
        {
          duration: 3500,
          step: function (now) {
            $this.attr('percentage', Math.floor(now));
          },
        }
      );
    });
  });
});


