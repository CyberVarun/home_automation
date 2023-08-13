document.addEventListener('DOMContentLoaded', async () => {
    const toggleSpan1 = document.getElementById('toggleSpan1');
    const toggleSpan2 = document.getElementById('toggleSpan2');

    const fetchLedState = async (led) => {
        try {
            const response = await fetch(`/get-led-state/${led}`);
            const data = await response.json();
            return data.ledState;
        } catch (error) {
            console.error(`Error fetching ${led} state:`, error);
            return false;
        }
    };

    const updateButtonState = async (toggleSpan, led) => {
        const isLedOn = await fetchLedState(led);
        if (isLedOn) {
            toggleSpan.classList.add('active');
        } else {
            toggleSpan.classList.remove('active');
        }
    };

    toggleSpan1.addEventListener('click', async () => {
        try {
            await fetch('/toggle-led/led1', { method: 'POST' });
            await updateButtonState(toggleSpan1, 'led1');
        } catch (error) {
            console.error('Error toggling led1:', error);
        }
    });

    toggleSpan2.addEventListener('click', async () => {
        try {
            await fetch('/toggle-led/led2', { method: 'POST' });
            await updateButtonState(toggleSpan2, 'led2');
        } catch (error) {
            console.error('Error toggling led2:', error);
        }
    });

    // Initial button state
    await updateButtonState(toggleSpan1, 'led1');
    await updateButtonState(toggleSpan2, 'led2');
});

