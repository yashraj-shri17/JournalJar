class ThemeToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Create button
        this.button = document.createElement("button");
        this.button.textContent = 'Toggle Theme';
        this.button.classList.add("toggle-button");
        this.button.addEventListener("click", () => this.toggleTheme());

        // Styles within the Shadow DOM
        const style = document.createElement("style");
        style.textContent = `
            .toggle-button {
                background-color: black;
                padding: 5px 10px;
                border: none;
                cursor: pointer;
                color: white;
                font-size: 14px;
                border-radius: 5px;
                transition: background 0.3s, color 0.3s;
            }

            /* Use :host to apply styles when the theme is dark */
            :host(.dark-mode) .toggle-button {
                background-color: white;
                color: black;
            }
        `;

        // Add elements to the Shadow DOM
        this.shadowRoot.append(style, this.button);
    }

    connectedCallback() {
        // Apply the saved theme
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.add("dark-mode");
            this.classList.add("dark-mode");
        }
        this.updateButtonStyle();
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.toggle("dark-mode");
        this.classList.toggle("dark-mode", isDark);

        // Save the preference in localStorage
        localStorage.setItem("theme", isDark ? "dark" : "light");

        this.updateButtonStyle();
    }

    updateButtonStyle() {
        const isDark = document.documentElement.classList.contains("dark-mode");
        this.button.textContent = isDark ? "Light Mode" : "Dark Mode";
    }
}

// Register the Web Component
customElements.define("theme-toggle", ThemeToggle);
