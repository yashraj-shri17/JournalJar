document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const htmlElement = document.documentElement;

    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }

    darkModeBtn.addEventListener('click', () => {
        if (htmlElement.getAttribute('data-theme') === 'dark') {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            darkModeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }
    });

    // Mood Tracker
    const moodButtons = document.querySelectorAll('.mood-btn');
    let selectedMood = null;

    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            moodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedMood = button.dataset.mood;
        });
    });

    // Tag System
    const tagInput = document.getElementById('tag-input');
    const tagContainer = document.getElementById('tag-container');
    const tags = new Set();

    tagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && tagInput.value.trim()) {
            const tagText = tagInput.value.trim().toLowerCase();
            if (!tags.has(tagText)) {
                tags.add(tagText);
                const tagElement = document.createElement('div');
                tagElement.className = 'tag';
                tagElement.innerHTML = `
                    ${tagText}
                    <span class="tag-remove">&times;</span>
                `;
                tagContainer.appendChild(tagElement);
                tagInput.value = '';

                tagElement.querySelector('.tag-remove').addEventListener('click', () => {
                    tags.delete(tagText);
                    tagElement.remove();
                });
            }
        }
    });

    // Journal Entries
    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    const saveButton = document.getElementById('save-entry');
    const viewButton = document.getElementById('view-entries');
    const entriesModal = new bootstrap.Modal(document.getElementById('entriesModal'));

    saveButton.addEventListener('click', () => {
        const entry = {
            id: Date.now(),
            title: document.getElementById('entry-title').value,
            content: document.getElementById('journal-text').value,
            mood: selectedMood,
            tags: Array.from(tags),
            date: new Date().toISOString()
        };

        entries.unshift(entry);
        localStorage.setItem('journalEntries', JSON.stringify(entries));
        clearForm();
    });

    viewButton.addEventListener('click', () => {
        displayEntries(entries);
        entriesModal.show();
    });

    // Search and Filter Functionality
    const moodFilter = document.getElementById('mood-filter');
    const dateFilter = document.getElementById('date-filter');

    // Listen to input events for search and filter
    document.getElementById('search-entries').addEventListener('input', updateDisplay);
    moodFilter.addEventListener('change', updateDisplay);
    dateFilter.addEventListener('change', updateDisplay);

    // Link the search button with the updateDisplay function
    document.getElementById('search-button').addEventListener('click', updateDisplay);

    function updateDisplay() {
        const searchTerm = document.getElementById('search-entries').value.toLowerCase();
        const selectedMood = moodFilter.value;
        const selectedDate = dateFilter.value;

        const filteredEntries = entries.filter(entry => {
            const matchesSearch = entry.title?.toLowerCase().includes(searchTerm) ||
                entry.content?.toLowerCase().includes(searchTerm) ||
                entry.tags?.some(tag => tag.toLowerCase().includes(searchTerm));

            const matchesMood = !selectedMood || entry.mood === selectedMood;

            const entryDate = new Date(entry.date).toISOString().split('T')[0]; // formatted for comparison
            const matchesDate = !selectedDate || entryDate === selectedDate;

            return matchesSearch && matchesMood && matchesDate;
        });

        // Show or hide the search results header based on filtered entries
        const searchResultsHeader = document.getElementById('search-results-header');
        if (filteredEntries.length > 0) {
            searchResultsHeader.style.display = 'block';
        } else {
            searchResultsHeader.style.display = 'none';
        }

        displayEntries(filteredEntries);
    }

    function clearForm() {
        document.getElementById('entry-title').value = '';
        document.getElementById('journal-text').value = '';
        tagContainer.innerHTML = '';
        tags.clear();
        moodButtons.forEach(btn => btn.classList.remove('active'));
        selectedMood = null;
    }

    // Random Quote Functionality
    const quotes = [
        "The only way to do great work is to love what you do.",
        "Life is what happens when you're busy making other plans.",
        "Get busy living or get busy dying.",
        "You have within you right now, everything you need to deal with whatever the world can throw at you.",
        "Believe you can and you're halfway there."
    ];

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quoteDisplay = document.getElementById('quote-display'); // Ensure this ID exists in your HTML
        quoteDisplay.innerText = quotes[randomIndex];
    }

    // Call this function on page load
    displayRandomQuote();
});
