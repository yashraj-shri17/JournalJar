class ThemeToggle extends HTMLElement {
    constructor() {
        super();
        // Retrieve theme from local storage or determine initial theme based on document's class
        this.theme = localStorage.getItem("theme") || (document.documentElement.classList.contains("dark") ? "dark" : "light");
        this.applyTheme();
    }

    connectedCallback() {
        this.render();
    }

    toggleTheme() {
        this.theme = this.theme === "light" ? "dark" : "light";
        this.applyTheme();
        this.render();
    }

    applyTheme() {
        if (this.theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", this.theme);
    }

    render() {
        // Render button with Tailwind classes
        this.innerHTML = `
        <button title="Toggle theme" class="text-gray-300 bg-transparent border-0 p-0 cursor-pointer focus:outline-none">
          ${this.theme === "dark" ? this.getSunIcon() : this.getMoonIcon()}
        </button>
      `;
        // Reattach the click event after rendering
        this.querySelector("button").addEventListener("click", () => this.toggleTheme());
    }

    getSunIcon() {
        return `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
      </svg>`;
    }

    getMoonIcon() {
        return `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
      </svg>`;
    }
}

customElements.define("theme-toggle", ThemeToggle);
