/**
 * Feed Page Module
 * Handles all feed page specific functionality
 */

export function initFeedPage() {
    console.log('RIVO: Initializing Feed page...');
    
    // Show the feed page immediately
    const feedPage = document.getElementById('feed-page') || document.querySelector('.page.active');
    if (feedPage) {
        feedPage.style.display = 'block';
        feedPage.style.opacity = '1';
        feedPage.style.visibility = 'visible';
        feedPage.classList.add('active');
    }
    
    // Initialize UI components
    initNewPostButton();
    initProductCards();
    initAnimations();
    
    // Ensure page is still visible after all resources load
    window.addEventListener('load', handlePageLoad);
}

/**
 * Initialize new post button
 */
function initNewPostButton() {
    const newPostButton = document.querySelector('.new-post-button');
    if (!newPostButton) return;
    
    newPostButton.addEventListener('click', () => {
        console.log('New post button clicked');
        // In a real app, this would open the new post flow
        
        // Add a subtle animation on click
        newPostButton.style.transform = 'rotate(90deg) scale(1.1)';
        setTimeout(() => {
            newPostButton.style.transform = 'rotate(0) scale(1)';
        }, 200);
    });
}

/**
 * Initialize product cards with hover effects
 */
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    if (!productCards.length) return;
    
    productCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click handler for product details
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on action buttons
            if (e.target.closest('.product-actions button')) {
                return;
            }
            
            console.log('Product card clicked');
            // In a real app, this would navigate to the product detail page
        });
        
        // Initialize like buttons
        const likeButton = card.querySelector('.like-button');
        if (likeButton) {
            likeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                likeButton.classList.toggle('active');
                const icon = likeButton.querySelector('i');
                if (likeButton.classList.contains('active')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
            });
        }
    });
}

/**
 * Initialize animations
 */
function initAnimations() {
    // Initial animations
    animateOnScroll();
    
    // Add scroll event for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Handle tab navigation for better accessibility
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-navigation');
        }
    });
    
    // Reset focus styles on mouse interaction
    document.addEventListener('mousedown', () => {
        document.documentElement.classList.remove('keyboard-navigation');
    });
}

/**
 * Animate elements on scroll
 */
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            // Stagger the animation
            element.style.transitionDelay = `${index * 50}ms`;
            element.classList.add('animate-fadeInUp');
        }
    });
}

/**
 * Handle page load
 */
function handlePageLoad() {
    const feedPage = document.getElementById('feed-page') || document.querySelector('.page.active');
    if (feedPage) {
        feedPage.style.display = 'block';
        feedPage.style.opacity = '1';
        feedPage.style.visibility = 'visible';
        feedPage.classList.add('active');
    }
    
    // Re-run animations after load
    animateOnScroll();
}

export default {
    init: initFeedPage
};
