document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    const loginButton = document.getElementById('loginButton');
    const message = document.getElementById('message');

    loginButton.addEventListener('click', async (e) => {
	e.preventDefault(); 
	
        const formData = new FormData(authForm);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('http://192.168.1.2:3000/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
	    console.log(data.success);
            if (data.success) {
                message.textContent = 'Authentication successful!';
		window.location.href = 'http://192.168.1.2:3000/led.html';
            } else {
                message.textContent = 'Authentication failed. Please try again.';
            }
        } catch (error) {
            console.error('Error:', error);
            message.textContent = 'An error occurred. Please try again later.';
        }
    });
});

