// Contact Form Validation//

// Select the contact form
const contactForm = document.querySelector("form");

// Listen for form submission
contactForm.addEventListener("submit", function (event) {

    // Prevent the form from submitting immediately
    event.preventDefault();

    // Get the values entered by the user
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const message = document.querySelector("#message").value.trim();

    // Check whether any field is empty
    if (name === "" || email === "" || phone === "" || message === "") {
        alert("Error: Please fill in all fields.");
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Error: Please enter a valid email address.");
        return;
    }

    // Validate phone number (digits only)
    const phonePattern = /^\d+$/;

    if (!phonePattern.test(phone)) {
        alert("Error: Phone number must contain digits only.");
        return;
    }

    // Display success message
    alert("Success! Your contact form has been validated.");

    // Reset the form
    contactForm.reset();
});
