document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Simple validation (in real app, use backend API)
    if (email === 'user@localvastra.com' && password === 'password123') {
        // Set login status
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        errorMessage.style.display = 'block';
    }
});

// Forgot password
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Password reset link will be sent to your email.');
});