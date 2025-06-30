document.addEventListener('DOMContentLoaded', function() {
    // Ensure bottom nav is collapsed on checkout page
    const bottomNav = document.querySelector('.bottom-nav');
    
    if (bottomNav) {
        bottomNav.classList.add('scrolled');
        bottomNav.style.pointerEvents = 'none';
    }
    
    // Make sure top bar is visible and properly styled
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
        topBar.style.transform = 'none';
        topBar.style.background = 'rgba(255, 255, 255, 0.98)';
        topBar.style.backdropFilter = 'blur(10px)';
        topBar.style.webkitBackdropFilter = 'blur(10px)';
        topBar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        topBar.style.pointerEvents = 'auto';
    }
    // DOM Elements
    const backButton = document.getElementById('backButton');
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    const changeAddressBtn = document.getElementById('changeAddressBtn');
    const changePaymentBtn = document.getElementById('changePaymentBtn');
    
    // Back button functionality
    backButton.addEventListener('click', function() {
        // In a real app, this would navigate back to the product page
        // For now, we'll just go back in history
        window.history.back();
    });
    
    // Change Address button
    changeAddressBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, this would open an address selection/entry modal
        alert('Address selection would open here in a real app');
    });
    
    // Change Payment button
    changePaymentBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, this would open a payment method selection modal
        alert('Payment method selection would open here in a real app');
    });
    
    // Confirm & Pay button
    confirmPaymentBtn.addEventListener('click', function() {
        // Show loading state
        const originalText = confirmPaymentBtn.innerHTML;
        confirmPaymentBtn.disabled = true;
        confirmPaymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Simulate API call
        setTimeout(() => {
            // In a real app, this would process the payment
            // and redirect to order confirmation page
            window.location.href = 'order-confirmation.html';
            
            // Reset button (in case of error)
            confirmPaymentBtn.disabled = false;
            confirmPaymentBtn.innerHTML = originalText;
        }, 2000);
    });
    
    // Payment method selection
    const paymentCards = document.querySelectorAll('.payment-card');
    paymentCards.forEach(card => {
        card.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                // Update visual state
                document.querySelectorAll('.payment-card').forEach(c => {
                    c.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                });
                this.style.borderColor = '#1a1a1a';
            }
        });
    });
    
    // Initialize first payment card as selected
    if (paymentCards.length > 0) {
        paymentCards[0].style.borderColor = '#1a1a1a';
    }
    
    // Bottom navigation active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPage.includes(href.replace('/', ''))) {
            item.classList.add('active');
        }
    });
});
