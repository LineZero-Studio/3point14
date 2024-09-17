const themeSwitch = document.getElementById("theme-switch");
const menuBtn = document.getElementById("menu-btn");

themeSwitch.addEventListener("click", (e) => {
    const themeSwitchKnob = document.getElementById("theme-switch-knob");
    const elementsToChange = [...document.getElementsByClassName("receives-formal"), ...document.getElementsByClassName("swiper-slide")];
    const contactBtn = document.getElementById("contactBtn");
    const planningBtn = document.getElementById("planningBtn");
    themeSwitch.classList.toggle("active");
    themeSwitchKnob.classList.toggle("active");
    for (const element of elementsToChange) {
        element.classList.toggle("formal");
    }
    if (contactBtn) {
        contactBtn.innerText = contactBtn.innerText === "Get the convo started" ? "Get in touch" : "Get the convo started"
    }
    if (planningBtn) {
        planningBtn.innerText = planningBtn.innerText === "Ask us how we do it" ? "Contact us" : "Ask us how we do it"
    }
});

menuBtn.addEventListener("click", (e) => {
    document.getElementsByTagName("html")[0].classList.toggle("stop-scrolling");
    function toggleClassRecursively(element, className, i) {
        // Toggle the class on the current element
        if (element.classList.contains("mobile-nav-link")) {
            setTimeout(() => {
                element.classList.toggle(className);
            }, element.classList.contains("open") ? 500 - (i * 125) : 500 + i * 125);
        } else {
            if (element.classList.contains("open")) {
                setTimeout(() => {
                    element.classList.toggle(className);
                }, 1000);
            } else {
                element.classList.toggle(className);
            }
        }

        let childIndex = 0;

        // Recursively toggle the class on all child elements
        Array.from(element.children).forEach(child => {
            childIndex++;
            toggleClassRecursively(child, className, childIndex);
        });
    }
    const navbar = document.getElementById("navbar-wrapper");
    toggleClassRecursively(navbar, "open", 0);
});

function updateFullHeightInVW() {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const vhInVW = (viewportHeight / viewportWidth) * 100;
    document.documentElement.style.setProperty('--fullheightinvw', `${vhInVW}vw`);
}

updateFullHeightInVW();

window.addEventListener('resize', updateFullHeightInVW);
