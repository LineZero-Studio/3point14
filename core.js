const themeSwitch = document.getElementById("theme-switch");
const menuBtn = document.getElementById("menu-btn");

themeSwitch.addEventListener("click", (e) => {
    const themeSwitchKnob = document.getElementById("theme-switch-knob");
    const elementsToChange = [...document.getElementsByClassName("receives-formal"), ...document.getElementsByClassName("swiper-slide")];
    themeSwitch.classList.toggle("active");
    themeSwitchKnob.classList.toggle("active");
    for (const element of elementsToChange) {
        element.classList.toggle("formal");
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
    const navbarWrapper = document.getElementById("navbar-wrapper");
    const navbar = document.getElementById("navbar");
    toggleClassRecursively(navbarWrapper, "open", 0);
    toggleClassRecursively(navbar, "open", 0);
});
