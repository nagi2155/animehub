document.addEventListener('DOMContentLoaded', () => {
    // Sliding Banner
    let slideIndex = 0;
    let autoSlideInterval;
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const bannerSlides = document.querySelector('.banner-slides');

    function showSlide(index) {
        slideIndex = (index + slides.length) % slides.length; // Ensure index loops
        bannerSlides.style.transform = `translateX(-${slideIndex * 12.5}%)`; // 100% / 8 slides = 12.5%
        updateDots();
    }

    function createDots() {
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                clearInterval(autoSlideInterval);
                showSlide(i);
                startAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === slideIndex);
        });
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval); // Clear any existing interval
        autoSlideInterval = setInterval(() => {
            showSlide(slideIndex + 1);
        }, 10000); // Change slide every 10 seconds
    }

    // Initialize slider
    createDots();
    showSlide(slideIndex);
    startAutoSlide();

    // Pause auto-slide on hover
    bannerSlides.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    bannerSlides.addEventListener('mouseleave', startAutoSlide);

    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        showSlide(slideIndex - 1);
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        showSlide(slideIndex + 1);
        startAutoSlide();
    });

    // Watch and Download Buttons
    const watchButtons = document.querySelectorAll('.watch-btn');
    const downloadButtons = document.querySelectorAll('.download-btn');

    watchButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Streaming feature coming soon! Visit a video URL here.');
        });
    });

    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Download feature coming soon! Check legal sources.');
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.toLowerCase();
            alert(`Searching for: ${query}`);
        }
    });

    // Section Navigation Buttons
    document.querySelectorAll('.section').forEach(section => {
        const grid = section.querySelector('.anime-grid');
        const prevBtn = section.querySelector('.prev-btn');
        const nextBtn = section.querySelector('.next-btn');
        let index = parseInt(grid.getAttribute('data-index') || 0);
        const cards = grid.querySelectorAll('.anime-card');
        const cardWidth = 240; // Width + margins (220px + 10px + 10px)
        const visibleCards = 4; // Number of cards to show at a time

        function updateGrid() {
            const totalCards = cards.length;
            const maxIndex = (Math.ceil(totalCards / visibleCards) - 1) * cardWidth; // Max index in pixels (960px for 3 slides)
            index = Math.max(0, Math.min(index, maxIndex));
            grid.style.transform = `translateX(-${index}px)`; // Slide by exact pixels
            grid.setAttribute('data-index', index);
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index >= maxIndex;
            console.log(`Index: ${index}, MaxIndex: ${maxIndex}, Transform: -${index}px`); // Debugging
        }

        nextBtn.addEventListener('click', () => {
            index = Math.min(index + cardWidth, (cards.length - visibleCards) * cardWidth); // Move by one card width
            updateGrid();
        });

        prevBtn.addEventListener('click', () => {
            index = Math.max(index - cardWidth, 0); // Move back by one card width
            updateGrid();
        });

        // Initialize with first 4 cards visible
        updateGrid();

        // Update on window resize
        window.addEventListener('resize', updateGrid);
    });
});