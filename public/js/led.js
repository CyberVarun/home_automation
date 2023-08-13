document.addEventListener("DOMContentLoaded", async () => {
  const toggleSpan1 = document.getElementById("toggleSpan1"); // Get toggleSpan1 element
  const toggleSpan2 = document.getElementById("toggleSpan2");

  const fetchLedState = async (led) => {
    // Define function to fetch LED state
    try {
      const response = await fetch(`/get-led-state/${led}`); // Send GET request to /get-led-state/:led
      const data = await response.json(); // Parse response body as JSON
      return data.ledState; // Return LED state
    } catch (error) {
      console.error(`Error fetching ${led} state:`, error); // Log error message to console
      return false;
    }
  };

  const updateButtonState = async (toggleSpan, led) => {
    // Define function to update button state
    const isLedOn = await fetchLedState(led); // Fetch LED state
    if (isLedOn) {
      // Check if LED is on
      toggleSpan.classList.add("active"); // Add active class to button if LED is on
    } else {
      toggleSpan.classList.remove("active"); // Remove active class from button if LED is off
    }
  };

  toggleSpan1.addEventListener("click", async () => {
    // Add event listener for click event
    try {
      await fetch("/toggle-led/led1", { method: "POST" }); // Send POST request to /toggle-led/:led
      await updateButtonState(toggleSpan1, "led1"); // Update button state
    } catch (error) {
      console.error("Error toggling led1:", error); // Log error message to console
    }
  });

  toggleSpan2.addEventListener("click", async () => {
    try {
      await fetch("/toggle-led/led2", { method: "POST" });
      await updateButtonState(toggleSpan2, "led2");
    } catch (error) {
      console.error("Error toggling led2:", error);
    }
  });

  // Initial button state
  await updateButtonState(toggleSpan1, "led1"); // Update button state
  await updateButtonState(toggleSpan2, "led2");
});
