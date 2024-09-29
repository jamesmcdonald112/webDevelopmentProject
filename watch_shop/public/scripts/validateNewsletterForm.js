function validateNewsletterForm() {
    // Retrieve the input element for the newsletter email.
    const emailInput = document.getElementById("newsletter-email");

    // Simple email pattern check
    // Pattern taken from - https://emaillistvalidation.com/blog/email-validation-in-javascript-using-regular-expressions-the-ultimate-guide/
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Check if the email input is empty. If it is, display an error message using Bootstrap's 'text-danger' class for red text.
    if (!emailInput.value) {
      document.getElementById("newsletter-message").innerHTML =
        "<span class='text-danger'>Email is required.</span>";  
     // Return false to prevent form submission and keep the user on the same page to correct the input.
      return false;

    } 

    // If the email is provided but does not match the defined pattern, show an error for an invalid email address.
    else if (!emailPattern.test(emailInput.value)) {
      document.getElementById("newsletter-message").innerHTML =
        "<span class='text-danger'>Please enter a valid email address.</span>";
      return false;
    }
    
    // If the email is valid, display a thank you message and still prevent form submission for demonstration.
    document.getElementById("newsletter-message").innerHTML =
      "<span class='text-success'>Thank you for subscribing!</span>";
    return false;
  }