document.addEventListener('DOMContentLoaded', function() {
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    const header = document.querySelector('.page-header');
    let lastScroll = 0;
    
    // Update each product card's info background
    productCards.forEach(card => {
        const image = card.querySelector('.product-image img');
        const infoSection = card.querySelector('.product-info');
        
        // Only proceed if both elements exist
        if (image && infoSection) {
            // Set the background of the info section to match the image
            const imageUrl = image.getAttribute('src');
            infoSection.style.backgroundImage = `url('${imageUrl}')`;
            
            // Add a class when the image is loaded
            image.onload = function() {
                infoSection.classList.add('bg-loaded');
            };
            
            // In case the image is already loaded (cached)
            if (image.complete) {
                infoSection.classList.add('bg-loaded');
            }
        }
    });
    
    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle scroll effect for header
    function handleScroll() {
        const feed = document.querySelector('.product-feed');
        if (!feed) return;
        
        // Get scroll position relative to the feed container
        const scrollTop = feed.scrollTop;
        
        if (scrollTop > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = scrollTop <= 0 ? 0 : scrollTop;
    }
    
    // Add scroll event to the feed container
    const feed = document.querySelector('.product-feed');
    if (feed) {
        // Throttle the scroll event for better performance
        let isScrolling;
        feed.addEventListener('scroll', function() {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(handleScroll, 30);
        }, false);
        
        // Initialize header state
        handleScroll();
    }
});
