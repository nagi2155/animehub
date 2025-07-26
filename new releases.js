document.addEventListener('DOMContentLoaded', function() {
    // Load More Functionality for Popular Anime
    const animeGrid = document.querySelector('#anime-grid');
    const loadMoreBtn = document.querySelector('#load-more');
    const cards = animeGrid.querySelectorAll('.anime-card');
    const cardsPerLoad = 10;
    let visibleCards = 0;

    function updateLoadMore() {
        // Hide all cards initially
        cards.forEach(card => {
            card.style.display = 'none';
        });

        // Show only the visible cards
        for (let i = 0; i < Math.min(visibleCards, cards.length); i++) {
            cards[i].style.display = 'grid';
        }

        // Disable button if all cards are shown
        loadMoreBtn.disabled = visibleCards >= cards.length;
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCards += cardsPerLoad;
            updateLoadMore();
        });
    }

    // Initialize with first 10 cards
    visibleCards = 10;
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
                const query = searchInput.value.trim().toLowerCase();
                alert(`Searching for: ${query}`);
            }
        });
    }
});