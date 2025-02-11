class MarqueeComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div class="marquee-container">
        <div class="marquee-content">
            <span> | &nbsp;&nbsp;&nbsp; JournalJar: A modular tracker to effortlessly log, organize, and reflect on your
                daily journey &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                Your personal journal, but smarter—modular tracking for your evolving journey &nbsp;&nbsp;&nbsp; |
                &nbsp;&nbsp;&nbsp;
                Capture your moments, track your progress, and reflect—all in one place.</span>
            <span> | &nbsp;&nbsp;&nbsp; JournalJar: A modular tracker to effortlessly log, organize, and reflect on your
                daily journey &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                Your personal journal, but smarter—modular tracking for your evolving journey &nbsp;&nbsp;&nbsp; |
                &nbsp;&nbsp;&nbsp;
                Capture your moments, track your progress, and reflect—all in one place.</span>
        </div>
    </div>`
    }
}

customElements.define('marquee-component', MarqueeComponent);
