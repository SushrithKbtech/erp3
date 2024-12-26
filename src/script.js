function showLogin() {
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('signupSection').classList.add('hidden');
    updateButtonStates('login');
}

function showSignUp() {
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('signupSection').classList.remove('hidden');
    updateButtonStates('signup');
}

function updateButtonStates(activeForm) {
    const buttons = document.querySelectorAll('.button-group .btn');
    buttons.forEach(button => {
        if ((activeForm === 'login' && button.textContent.includes('Login')) ||
            (activeForm === 'signup' && button.textContent.includes('Sign Up'))) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Form validation for signup form
document.getElementById('signupForm').addEventListener('submit', function(e) {
    const password = this.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        e.preventDefault(); // Prevent form submission if passwords don't match
    }
});
