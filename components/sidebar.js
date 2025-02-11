class SidebarComponent extends HTMLElement {
  constructor() {
    super();
    this.isMobileMenuOpen = false;
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.render();
    this.attachEventListeners();
  }

  render() {
    const currentPath = window.location.pathname;
    const navigation = [
      { name: "Home", href: "/", icon: this.getHomeIcon() },
      { name: "Journal", href: "/pages/journal.html", icon: this.getBookOpenIcon() },
    ];

    const navLinks = navigation
      .map((item) => {
        const isActive = currentPath === item.href;
        return `
            <a href="${item.href}" class="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
            ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300"
            : "text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-purple-900/30"
          }">
              ${item.icon}
              ${item.name}
            </a>
          `;
      })
      .join("");

    const mobileMenuPath = this.isMobileMenuOpen
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`;

    this.innerHTML = `
        <!-- Mobile menu button -->
        <button id="mobile-menu-button" class="fixed right-4 top-4 z-50 rounded-md bg-neutral-500 p-2 text-white md:hidden">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${mobileMenuPath}
          </svg>
        </button>
  
        <!-- Sidebar -->
        <aside class="${this.isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} fixed left-0 top-0 z-40 h-full w-64 transform bg-white transition-transform duration-200 ease-in-out dark:bg-zinc-900 md:sticky md:translate-x-0 border-r">
          <div class="flex h-full flex-col">
            <!-- Logo -->
            <div class="flex h-16 items-center border-b px-6 dark:border-gray-700">
              <h1 class="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                Journal Jar
              </h1>
            </div>
  
            <!-- Navigation -->
            <nav class="flex-1 space-y-1 px-3 py-4">
              ${navLinks}
            </nav>
  
            <!-- Footer -->
            <div class="border-t p-4 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <a href="/settings" class="hidden flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-purple-900/30">
                  ${this.getSettingsIcon()}
                  Settings
                </a>
                <theme-toggle></theme-toggle>
              </div>
            </div>
          </div>
        </aside>
      `;
  }

  attachEventListeners() {
    const mobileMenuButton = this.querySelector("#mobile-menu-button");
    if (mobileMenuButton) {
      mobileMenuButton.onclick = () => this.toggleMobileMenu();
    }
  }

  // Icon methods returning inline SVG strings
  getHomeIcon() {
    return `<svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M3 9.75L12 3l9 6.75V21a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 15 21v-4a1.5 1.5 0 0 0-3 0v4a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 3 21V9.75z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </svg>`;
  }
  getBookOpenIcon() {
    return `<svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M2 7.5A2.5 2.5 0 0 1 4.5 5h15A2.5 2.5 0 0 1 22 7.5v9A2.5 2.5 0 0 1 19.5 19h-15A2.5 2.5 0 0 1 2 16.5v-9z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        <path d="M22 7.5l-10 6-10-6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </svg>`;
  }
  getSettingsIcon() {
    return `<svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
      </svg>`;
  }
}

customElements.define("sidebar-component", SidebarComponent);
