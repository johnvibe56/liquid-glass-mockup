/**
 * Discover Page Module
 * Handles all discover page specific functionality
 */

export function initDiscoverPage() {
    console.log('RIVO: Initializing Discover page...');
    
    // Get the discover page element
    const discoverPage = document.getElementById('discover-page');
    if (!discoverPage) return;
    
    // Initialize featured image loading
    initFeaturedImage();
    
    // Initialize UI components
    initSearch();
    initTagFiltering();
    initBackToTop();
    initAnimations();
    
    // Handle page visibility
    const handlePageShow = () => {
        console.log('RIVO: Discover page shown');
        discoverPage.style.display = 'flex';
        discoverPage.style.opacity = '1';
        discoverPage.style.visibility = 'visible';
        discoverPage.classList.add('active');
        
        // Initialize animations after a short delay
        setTimeout(initAnimations, 100);
    };
    
    // Add event listener for page show
    window.addEventListener('pageshow', handlePageShow);
    
    // Initialize immediately if already on the discover page
    if (window.location.pathname.includes('discover.html')) {
        handlePageShow();
    }
}

/**
 * Handle featured image loading with fallback
 */
function initFeaturedImage() {
    const featuredImage = document.querySelector('.featured-pick__image');
    if (!featuredImage) return;
    
    // Force reload the image
    const src = featuredImage.src;
    featuredImage.src = '';
    setTimeout(() => { featuredImage.src = src; }, 100);
    
    // Add error handler as fallback
    featuredImage.onerror = function() {
        console.log('Image failed to load, using fallback');
        this.src = 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=80';
        this.onerror = null; // Prevent infinite loop
        this.style.opacity = '1'; // Ensure fallback is visible
    };
    
    // Ensure image is visible once loaded
    featuredImage.onload = function() {
        this.style.opacity = '1';
        console.log('Image loaded successfully');
    };
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchButton = document.getElementById('searchBox');
    const searchInput = document.querySelector('.search-input');
    
    if (!searchButton || !searchInput) return;
    
    // Toggle search box
    searchButton.addEventListener('click', () => {
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        }
    });
    
    // Handle search input
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const collectionCards = document.querySelectorAll('.collection-card');
        
        collectionCards.forEach(card => {
            const title = card.querySelector('.collection-card__title')?.textContent.toLowerCase() || '';
            const isVisible = title.includes(searchTerm);
            card.style.display = isVisible ? 'block' : 'none';
        });
    });
}

/**
 * Initialize tag filtering
 */
function initTagFiltering() {
    const tags = document.querySelectorAll('.tag');
    if (!tags.length) return;
    
    // Initialize tag filtering
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const selectedTag = tag.dataset.tag;
            filterByTag(selectedTag);
        });
    });
}

/**
 * Filter collections by tag
 */
function filterByTag(tag) {
    const tags = document.querySelectorAll('.tag');
    const collectionCards = document.querySelectorAll('.collection-card');
    
    // Update active tag UI
    tags.forEach(t => {
        if (t.dataset.tag === tag) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });

    // Filter collection cards
    collectionCards.forEach(card => {
        const cardTags = card.dataset.tags ? card.dataset.tags.split(' ') : [];
        if (tag === 'all' || cardTags.includes(tag)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;
    
    const toggleBackToTop = () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop(); // Initial check
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
        // Close search on escape
        const searchInput = document.querySelector('.search-input');
        if (e.key === 'Escape' && searchInput?.classList.contains('active')) {
            searchInput.classList.remove('active');
            document.getElementById('searchBox')?.focus();
        }
        
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
    const elements = document.querySelectorAll('.featured-pick, .trending-tags, .curated-collections, .collection-card');
    
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
    const discoverPage = document.getElementById('discover-page');
    if (discoverPage) {
        discoverPage.style.display = 'flex';
        discoverPage.style.opacity = '1';
        discoverPage.style.visibility = 'visible';
        discoverPage.classList.add('active');
    }
    
    // Re-run animations after load
    animateOnScroll();
}

export default {
    init: initDiscoverPage
};
