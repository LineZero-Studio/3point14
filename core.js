const themeSwitch = document.getElementById("theme-switch");
const menuBtn = document.getElementById("menu-btn");
const servicesMobileLink = document.getElementById("servicesMobileLink");

function setCookie(cookieName, cookieVal, expiry) {
    var d = new Date();
    d.setTime(d.getTime() + (expiry * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieVal + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var sitemode = getCookie("sitemode");
    const elementsToChange = [...document.getElementsByClassName("receives-formal")];
    setTimeout(() => {
        for (const element of elementsToChange) {
            if (element.classList.contains("receives-formal")) {
                element.classList.add("loaded");
            }
        }
    }, 0);
    if (sitemode != 0) {
        if (sitemode == "formal") {
            const themeSwitchKnob = document.getElementById("theme-switch-knob");
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
        }
    } else {
        if (window.location.pathname === "/") {
            document.getElementById("introScreen").style.display = "block";
            document.getElementsByTagName("html")[0].classList.add("stop-scrolling");
        }
    }
}

document.addEventListener("DOMContentLoaded", checkCookie);

themeSwitch.addEventListener("click", (e) => {
    const cookie = getCookie("sitemode");
    if (cookie === "raw") {
        setCookie("sitemode", "formal", 365);
    } else {
        setCookie("sitemode", "raw", 365);
    }
    const themeSwitchKnob = document.getElementById("theme-switch-knob");
    const elementsToChange = [...document.getElementsByClassName("receives-formal")];
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
            }, element.classList.contains("open") ? 350 - (i * 87) : 350 + i * 87);
        } else {
            if (element.classList.contains("open") && !element.classList.contains("menu-button-line")) {
                setTimeout(() => {
                    element.classList.toggle(className);
                }, 300);
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

servicesMobileLink.addEventListener("click", (e) => {
    document.getElementsByTagName("html")[0].classList.remove("stop-scrolling");
    function removeClassRecursively(element, className, i) {
        if (element.classList.contains("mobile-nav-link")) {
            setTimeout(() => {
                element.classList.remove(className);
            }, 500 - (i * 125));
        } else {
            if (!element.classList.contains("menu-button-line")) {
                setTimeout(() => {
                    element.classList.remove(className);
                }, 1000);
            } else {
                element.classList.remove(className);
            }
        }

        let childIndex = 0;

        // Recursively toggle the class on all child elements
        Array.from(element.children).forEach(child => {
            childIndex++;
            removeClassRecursively(child, className, childIndex);
        });
    }
    const navbar = document.getElementById("navbar-wrapper");
    removeClassRecursively(navbar, "open", 0);
});

function updateFullHeightInVW() {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const vhInVW = (viewportHeight / viewportWidth) * 100;
    document.documentElement.style.setProperty('--fullheightinvw', `${vhInVW}vw`);
}

updateFullHeightInVW();

window.addEventListener('resize', updateFullHeightInVW);
