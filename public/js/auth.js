document.addEventListener("DOMContentLoaded", () => {
  // DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
  const authForm = document.getElementById("authForm");
  const loginButton = document.getElementById("loginButton");
  const message = document.getElementById("message");

  loginButton.addEventListener("click", async (e) => {
    // Add event listener for click event
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(authForm); // Create new FormData object
    const username = formData.get("username"); // Get username from form
    const password = formData.get("password"); // Get password from form

    try {
      const response = await fetch("/authenticate", {
        // Send POST request to /authenticate
        method: "POST", // Use POST method
        headers: {
          // Set headers
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Set request body
      });

      const data = await response.json(); // Parse response body as JSON
      console.log(data.success); // Log success value to console
      if (data.success) {
        // Check if authentication was successful
        message.textContent = "Authentication successful!"; // Set message text
        window.location.href = "http://192.168.1.2:3000/led.html"; // Redirect to led.html
      } else {
        message.textContent = "Authentication failed. Please try again."; // Set message text
      }
    } catch (error) {
      console.error("Error:", error); // Log error message to console
      message.textContent = "An error occurred. Please try again later."; // Set message text
    }
  });
});