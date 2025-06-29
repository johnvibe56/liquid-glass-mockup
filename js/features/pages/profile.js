/**
 * Profile Page Module
 * Handles all profile page specific functionality
 */

export function initProfilePage() {
    console.log('RIVO: Initializing Profile page...');
    
    // Show the profile page immediately
    const profilePage = document.getElementById('profile-page') || document.querySelector('.page.active');
    if (profilePage) {
        profilePage.style.display = 'flex';
        profilePage.style.opacity = '1';
        profilePage.style.visibility = 'visible';
        profilePage.classList.add('active');
    }
    
    // Initialize UI components
    initProfileGrid();
    initSettingsButton();
    initAnimations();
    
    // Ensure page is still visible after all resources load
    window.addEventListener('load', handlePageLoad);
}

/**
 * Initialize profile grid with user's posts
 */
function initProfileGrid() {
    const profileGrid = document.querySelector('.profile-grid');
    if (!profileGrid) return;
    
    // In a real app, this would be fetched from an API
    const mockPosts = [
        { id: 1, image: 'images/post1.jpg', likes: 42, comments: 5 },
        { id: 2, image: 'images/post2.jpg', likes: 24, comments: 3 },
        { id: 3, image: 'images/post3.jpg', likes: 36, comments: 8 },
        { id: 4, image: 'images/post4.jpg', likes: 19, comments: 2 },
        { id: 5, image: 'images/post5.jpg', likes: 28, comments: 4 },
        { id: 6, image: 'images/post6.jpg', likes: 51, comments: 7 },
    ];
    
    // Clear any existing content
    profileGrid.innerHTML = '';
    
    // Add posts to grid
    mockPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'profile-post';
        postElement.innerHTML = `
            <img src="${post.image}" alt="Post ${post.id}" loading="lazy">
            <div class="post-overlay">
                <span><i class="fas fa-heart"></i> ${post.likes}</span>
                <span><i class="fas fa-comment"></i> ${post.comments}</span>
            </div>
        `;
        profileGrid.appendChild(postElement);
    });
}

/**
 * Initialize settings button
 */
function initSettingsButton() {
    const settingsButton = document.querySelector('.btn-icon[aria-label="Settings"]');
    if (!settingsButton) return;
    
    settingsButton.addEventListener('click', () => {
        // In a real app, this would open a settings modal
        console.log('Settings button clicked');
        
        // Add a subtle animation on click
        settingsButton.style.transform = 'rotate(30deg)';
        setTimeout(() => {
            settingsButton.style.transform = 'rotate(0)';
        }, 200);
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
    const elements = document.querySelectorAll('.profile-post, .profile-header');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.classList.add('animate-fadeInUp');
        }
    });
}

/**
 * Handle page load
 */
function handlePageLoad() {
    const profilePage = document.getElementById('profile-page') || document.querySelector('.page.active');
    if (profilePage) {
        profilePage.style.display = 'flex';
        profilePage.style.opacity = '1';
        profilePage.style.visibility = 'visible';
        profilePage.classList.add('active');
    }
    
    // Re-run animations after load
    animateOnScroll();
}

export default {
    init: initProfilePage
};
