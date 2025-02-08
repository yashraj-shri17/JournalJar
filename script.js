document.addEventListener('DOMContentLoaded', () => {
    const dailyPrompts = [
        "What are you grateful for today?",
        "Describe a moment that made you smile.",
        "What challenges are you currently facing?",
        "Write about a goal you want to achieve.",
        "Reflect on a recent learning experience."
    ];

    const quotes = [
        {
            "quote": "The journey of a thousand miles begins with one step.",
            "author": "Lao Tzu"
        },
        {
            "quote": "Believe you can and you're halfway there.",
            "author": "Theodore Roosevelt"
        },
        {
            "quote": "Don't watch the clock; do what it does. Keep going.",
            "author": "Sam Levenson"
        },
        {
            "quote": "Keep your face always toward the sunshine—and shadows will fall behind you.",
            "author": "Walt Whitman"
        },
        {
            "quote": "The only way to do great work is to love what you do.",
            "author": "Steve Jobs"
        },
        {
            "quote": "Success is not the key to happiness. Happiness is the key to success.",
            "author": "Albert Schweitzer"
        },
        {
            "quote": "The best way to predict the future is to create it.",
            "author": "Peter Drucker"
        }
    ];

    // Daily Prompt
    function setDailyPrompt() {
        const promptElement = document.getElementById('daily-prompt-text');
        const randomPrompt = dailyPrompts[Math.floor(Math.random() * dailyPrompts.length)];
        promptElement.textContent = randomPrompt;
    }

    // Daily Quote
    function setDailyQuote() {
        const quoteElement = document.getElementById('daily-quote');
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.innerHTML = `"${randomQuote.quote}" - ${randomQuote.author}`;
    }

    // Mood Tracking
    function setupMoodTracking() {
        const moodButtons = document.querySelectorAll('.mood-btn');
        moodButtons.forEach(button => {
            button.addEventListener('click', () => {
                moodButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                localStorage.setItem('currentMood', button.dataset.mood);
            });
        });
    }

    // Tag System
    function setupTagSystem() {
        const tagInput = document.getElementById('tag-input');
        const tagContainer = document.getElementById('tag-container');

        tagInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && tagInput.value.trim() !== '') {
                const tag = document.createElement('div');
                tag.className = 'tag';
                tag.textContent = tagInput.value;
                const closeBtn = document.createElement('span');
                closeBtn.className = 'tag-close';
                closeBtn.textContent = 'x';
                closeBtn.onclick = () => tagContainer.removeChild(tag);
                tag.appendChild(closeBtn);
                tagContainer.appendChild(tag);
                tagInput.value = '';
            }
        });
    }

    // Save Journal Entry
    function saveEntry() {
        const title = document.getElementById('entry-title').value;
        const text = document.getElementById('journal-text').value;
        const tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent.replace('x', '').trim());
        const mood = localStorage.getItem('currentMood') || 'neutral';

        if (title && text) {
            const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            entries.push({ title, text, tags, mood, date: new Date().toLocaleString() });
            localStorage.setItem('journalEntries', JSON.stringify(entries));
            alert('Entry saved!');
            clearEntryFields();
        } else {
            alert('Please fill in both title and text.');
        }
    }

    // Clear Entry Fields
    function clearEntryFields() {
        document.getElementById('entry-title').value = '';
        document.getElementById('journal-text').value = '';
        document.getElementById('tag-input').value = '';
        document.getElementById('tag-container').innerHTML = '';
    }

    // View Entries
    function viewEntries() {
        const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        const entriesList = document.getElementById('entries-list');
        entriesList.innerHTML = '';

        entries.forEach(entry => {
            const entryItem = document.createElement('div');
            entryItem.className = 'entries-item';
            entryItem.innerHTML = `<strong>${entry.title}</strong> <br> ${entry.text} <br> <small>${entry.date} - Mood: ${entry.mood}</small>`;
            entriesList.appendChild(entryItem);
        });

        const entriesModal = new bootstrap.Modal(document.getElementById('entriesModal'));
        entriesModal.show();
    }

    // Search Functionality
    function setupSearchFunctionality() {
        const searchInput = document.getElementById('search-entries');
        searchInput.addEventListener('input', () => {
            const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            const searchTerm = searchInput.value.toLowerCase();
            const entriesList = document.getElementById('entries-list');
            entriesList.innerHTML = '';

            entries.forEach(entry => {
                if (entry.title.toLowerCase().includes(searchTerm) || entry.text.toLowerCase().includes(searchTerm)) {
                    const entryItem = document.createElement('div');
                    entryItem.className = 'entries-item';
                    entryItem.innerHTML = `<strong>${entry.title}</strong> <br> ${entry.text} <br> <small>${entry.date} - Mood: ${entry.mood}</small>`;
                    entriesList.appendChild(entryItem);
                }
            });
        });
    }

    // Dark Mode
    function toggleTheme() {
        document.body.classList.toggle("dark-theme");
        document.body.classList.toggle("light-theme");

        const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
        localStorage.setItem("theme", theme);

        let icon = document.getElementById("theme-icon");
        if (theme === "dark") {
            icon.classList.remove("bi-moon");
            icon.classList.add("bi-sun");
        } else {
            icon.classList.remove("bi-sun");
            icon.classList.add("bi-moon");
        }
    }

    function loadTheme() {
        const theme = localStorage.getItem("theme") || "light";
        if (theme === "dark") {
            document.body.classList.add("dark-theme");
            document.body.classList.remove("light-theme");
        } else {
            document.body.classList.add("light-theme");
            document.body.classList.remove("dark-theme");
        }

        let icon = document.getElementById("theme-icon");
        if (theme === "dark") {
            icon.classList.remove("bi-moon");
            icon.classList.add("bi-sun");
        } else {
            icon.classList.remove("bi-sun");
            icon.classList.add("bi-moon");
        }
    }

    // Event Listeners
    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
    document.getElementById('save-entry').addEventListener('click', saveEntry);
    document.getElementById('view-entries').addEventListener('click', viewEntries);

    // Initialize App
    loadTheme();
    setDailyPrompt();
    setDailyQuote();
    setupMoodTracking();
    setupTagSystem();
    setupSearchFunctionality();
});

// Dark and Light Mode toggle functionality code
document.addEventListener('DOMContentLoaded', () => {
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const body = document.body;

    // Check and Apply Saved Dark Mode Preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }

    // Toggle Dark Mode
    darkModeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    });
});
