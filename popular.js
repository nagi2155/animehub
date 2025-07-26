document.addEventListener('DOMContentLoaded', () => {
    // Load More Functionality for Popular Anime
    const animeGrid = document.getElementById('anime-grid');
    const loadMoreBtn = document.getElementById('load-more');
    const cards = animeGrid.querySelectorAll('.anime-card');
    const cardsPerLoad = 10;
    let visibleCards = 10;

    function updateLoadMore() {
        // Ensure all cards are processed
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.display = i < visibleCards ? 'grid' : 'none';
        }
        // Disable button when all cards are visible
        loadMoreBtn.disabled = visibleCards >= cards.length;
    }

    // Attach click event listener to Load More button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCards += cardsPerLoad;
            updateLoadMore();
        });
    }

    // Initialize with first 10 cards
    updateLoadMore();

    // Watch Buttons
    const watchButtons = document.querySelectorAll('.watch-btn');
    watchButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Streaming feature coming soon! Visit a video URL here.');
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase();
                alert(`Searching for: ${query}`);
            }
        });
    }
});