// =============================================
// MAIN.JS - Shared functionality for LocalVastra
// =============================================

// 1. Navigation and Session Management
// ====================================

// Load common navbar (if using)
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-container').innerHTML = html;
            updateNavbar();
        });
}

// Update navbar based on login status
function updateNavbar() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginLink = document.getElementById('nav-login');
    const logoutLink = document.getElementById('nav-logout');
    const profileLink = document.getElementById('nav-profile');

    if (isLoggedIn) {
        if (loginLink) loginLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'block';
        if (profileLink) profileLink.style.display = 'block';
    } else {
        if (loginLink) loginLink.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'none';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('cartItems');
    window.location.href = 'login.html';
}

// 2. Authentication Helpers
// ==========================

// Check if user is logged in (for protected pages)
function checkAuth() {
    const protectedPages = ['dashboard.html', 'profile.html', 'checkout.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'login.html?redirect=' + encodeURIComponent(currentPage);
        }
    }
}

// 3. Cart Management
// ==================

// Initialize cart if not exists
function initCart() {
    if (!localStorage.getItem('cartItems')) {
        localStorage.setItem('cartItems', JSON.stringify([]));
    }
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const cart = JSON.parse(localStorage.getItem('cartItems'));
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count display
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cartItems'));
    const countElements = document.querySelectorAll('.cart-count');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    countElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

// 4. Initialize Page
// ==================

document.addEventListener('DOMContentLoaded', function() {
    // Load common elements
    if (document.getElementById('navbar-container')) {
        loadNavbar();
    }
    
    // Check authentication for protected pages
    checkAuth();
    
    // Initialize shopping cart
    initCart();
    updateCartCount();
    
    // Display user info if logged in
    if (localStorage.getItem('isLoggedIn')) {
        const userEmail = localStorage.getItem('userEmail');
        const userElements = document.querySelectorAll('.user-email');
        userElements.forEach(el => {
            el.textContent = userEmail;
        });
    }
});

// 5. Utility Functions
// ====================

// Format currency
function formatCurrency(amount) {
    return '₹' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Show loading spinner
function showLoading() {
    document.getElementById('loading-spinner').style.display = 'block';
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
}