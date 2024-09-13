const themeSwitch = document.getElementById("theme-switch");
const menuBtn = document.getElementById("menu-btn");
let projectAnimationInterval;
let projectAnimationWaiting = true;
let numberOfProjects = 0; // Keeps track of unique projects
let numberOfLogos = 0; // Keeps track of unique logos
let activeTrackAddClassFunction = null;
let isFormal = false;
let buttonsDebounced = false;
let tempHiddenTimeout = null;

function updateFullHeightInVW() {
      // Get the viewport height in pixels
      const vh = window.innerHeight;

      // Calculate the equivalent value in viewport width (vw)
      const vw = window.innerWidth;

      // Calculate the value for --fullHeightInVW
      const fullHeightInVW = (vh / vw) * 100;

      // Update the CSS variable
      document.documentElement.style.setProperty('--fullHeightInVW', `${fullHeightInVW}vw`);
    }

  // Add event listener for resize
  window.addEventListener('resize', updateFullHeightInVW);

  // Initial call to set the value
  updateFullHeightInVW();

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
  contactBtn.innerText = contactBtn.innerText === "Get the convo started" ? "Get in touch" : "Get the convo started"
  planningBtn.innerText = planningBtn.innerText === "Ask us how we do it" ? "Contact us" : "Ask us how we do it"
  if (themeSwitch.classList.contains("active")) {
    isFormal = false;
    clearProjectAnimationInterval();
    projectAnimationWaiting = false;

    inactivateAllProjects();
  } else {
    isFormal = true;
    determineActiveProject();

    activateProjectAnimationInterval();
  }
});

menuBtn.addEventListener("click", (e) => {
	function toggleClassRecursively(element, className) {
    // Toggle the class on the current element
    if (element.classList.contains("mobile-menu-links")) {
    	setTimeout(() => {
      	element.classList.toggle(className);
      }, 500);
    } else {
    	element.classList.toggle(className);
    }

    // Recursively toggle the class on all child elements
    Array.from(element.children).forEach(child => {
        toggleClassRecursively(child, className);
    });
	}
	const navbarWrapper = document.getElementById("navbar-wrapper");
  toggleClassRecursively(navbarWrapper, "open");
});

document.addEventListener('DOMContentLoaded', function () {
  const elements = document.getElementsByClassName('has-animation');
  const className = 'end';

  setInterval(() => {
    for (const element of elements) {
      element.classList.toggle(className);
    }
  }, 2000);

  const projectList = document.getElementById("projectList");
  const projects = document.getElementsByClassName("collection-item");

  numberOfProjects = projects.length;

  const animationTimerContainer = document.getElementById("animationTimerContainer");

  for (let i = 0; i < projects.length; i++) {
    const itemIndex = (i + 1) % projects.length; // Second element is treated as first
    const img = document.createElement('img');
    img.src = projects[itemIndex].querySelector('img').src;
    img.classList.add("animation-timer-image");
    img.dataset.moveBy = itemIndex - 1;
    img.addEventListener("click", function () {
      const targetIndex = getActiveProjectNonDuplicateIndex();
      const projectIndex = getActiveProjectIndex();

      if (i === targetIndex) {
        return;
      }

      const moveBy = img.dataset.moveBy;

      if (moveBy > 0) {
        for (let j = 0; j < moveBy; j++) {
          moveProjectCarouselNext();
        }
      } else {
        for (let j = 0; j < Math.abs(moveBy); j++) {
          moveProjectCarouselPrev();
        }
      }

      setTimeout(() => {
        inactivateAllProjects();
        determineActiveProject();
      }, 0)

      clearProjectAnimationInterval();

      projectAnimationWaiting = true;

      activateProjectAnimationInterval();
    });
    animationTimerContainer.appendChild(img);
    const outerDiv = document.createElement("div");
    outerDiv.classList.add("animation-timer-progress-wrapper");
    const inactiveTrack = document.createElement("div");
    inactiveTrack.classList.add("animation-timer-inactive-track");
    const activeTrack = document.createElement("div");
    activeTrack.classList.add("animation-timer-active-track");
    outerDiv.appendChild(inactiveTrack);
    outerDiv.appendChild(activeTrack);
    animationTimerContainer.appendChild(outerDiv);
  }

  for (let i = 0; i < numberOfProjects; i++) {
    var cln = projects[i].cloneNode(true);
    projectList.appendChild(cln);
  }

  for (let i = 0; i < numberOfProjects; i++) {
    var cln = projects[i].cloneNode(true);
    projectList.appendChild(cln);
  }

  for (let i = numberOfProjects - 1; i < projects.length; i++) {
    if (i - numberOfProjects + 1 === 10) {
      projects[i].classList.add(`negative5`);
      for (const child of projects[i].children) {
        child.classList.add(`negative5`);
      }
    } else {
      projects[i].classList.add(`_${i - numberOfProjects + 1}`);
      for (const child of projects[i].children) {
        child.classList.add(`_${i - numberOfProjects + 1}`);
      }
    }
  }

  for (let i = 0; i < numberOfProjects - 1; i++) {
    projects[i].classList.add(`negative${numberOfProjects - i - 1}`);
    for (const child of projects[i].children) {
      child.classList.add(`negative${numberOfProjects - i - 1}`);
    }
  }

  const projectCarouselImages = document.getElementsByClassName("project-carousel-image");
  const prevProjectCursor = document.getElementById("prevProjectCursor");
  const nextProjectCursor = document.getElementById("nextProjectCursor");
  const viewProjectCursor = document.getElementById("viewProjectCursor");

  for (const projectCarouselImage of projectCarouselImages) {
    projectCarouselImage.addEventListener("click", function () {
      if (!isFormal) {
        return;
      }

      if (projectCarouselImage.classList.contains("_1")) {
        moveProjectCarouselPrev();
        setTimeout(() => {
          inactivateAllProjects();
          determineActiveProject();
        }, 0)
        clearProjectAnimationInterval();

        projectAnimationWaiting = true;

        activateProjectAnimationInterval();
      }
      if (projectCarouselImage.classList.contains("_3")) {
        moveProjectCarouselNext();
        setTimeout(() => {
          inactivateAllProjects();
          determineActiveProject();
        }, 0)
        clearProjectAnimationInterval();

        projectAnimationWaiting = true;

        activateProjectAnimationInterval();
      }
    });

    projectCarouselImage.addEventListener("mouseenter", function (event) {
      if (projectCarouselImage.classList.contains("_1")) {
        prevProjectCursor.style.opacity = '1';
        prevProjectCursor.style.transform = "scale(1)";
      }
      if (projectCarouselImage.classList.contains("_2")) {
        viewProjectCursor.style.opacity = '1';
        viewProjectCursor.style.transform = "scale(1)";
      }
      if (projectCarouselImage.classList.contains("_3")) {
        nextProjectCursor.style.opacity = '1';
        nextProjectCursor.style.transform = "scale(1)";
      }
    });

    projectCarouselImage.addEventListener("mouseleave", function (event) {
      if (projectCarouselImage.classList.contains("_1")) {
        prevProjectCursor.style.opacity = '0';
        prevProjectCursor.style.transform = "scale(0)";
      }
      if (projectCarouselImage.classList.contains("_2")) {
        viewProjectCursor.style.opacity = '0';
        viewProjectCursor.style.transform = "scale(0)";
      }
      if (projectCarouselImage.classList.contains("_3")) {
        nextProjectCursor.style.opacity = '0';
        nextProjectCursor.style.transform = "scale(0)";
      }
    });
  }

  const logoList = document.getElementById("logoList");
  numberOfLogos = logoList.children.length;
  let logosInitialWidth = logoList.scrollWidth - (window.innerWidth * 0.0206);

  for (let i = 0; i < numberOfLogos; i++) {
    var cln = logoList.children[i].cloneNode(true);
    logoList.appendChild(cln);
  }

  while (logoList.scrollWidth <= window.innerWidth * 2) {
    for (let i = 0; i < numberOfLogos; i++) {
      var cln = logoList.children[i].cloneNode(true);
      logoList.appendChild(cln);
    }
  }

  logoList.style.left = "0px";

  setInterval(() => {
    const leftNum = parseFloat(logoList.style.left);
    logoList.style.left = ((leftNum - 1) % (logosInitialWidth)) + "px";
  }, 10);

  window.addEventListener('resize', function () {
    logosInitialWidth = logoList.scrollWidth - (window.innerWidth * 0.0206);
  });

  dragCarousel(document.getElementById("projectList"));
});

let socialIndex = 0;

const socialPrevBtn = document.getElementById("socialPrevBtn");
const socialNextBtn = document.getElementById("socialNextBtn");

function moveSocialCarousel(px) {
  const swiper = document.getElementsByClassName("swiper")[0];
  swiper.style.left = (-23.27 * socialIndex) + "vw";
}

socialPrevBtn.addEventListener("click", function () {
  socialNextBtn.style.display = "inline-block";
  socialIndex--;
  moveSocialCarousel();
  if (socialIndex == -5) {
    socialPrevBtn.style.display = "none";
  }
});

socialNextBtn.addEventListener("click", function () {
  socialPrevBtn.style.display = "inline-block";
  socialIndex++;
  moveSocialCarousel();
  if (socialIndex == 27) {
    socialNextBtn.style.display = "none";
  }
});

function moveCursor(cursorElement) {
  const cursorWidth = cursorElement.clientWidth;
  const cursorHeight = cursorElement.clientHeight;
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  cursorElement.style.left = `${mouseX - cursorWidth / 2}px`;
  cursorElement.style.top = `${mouseY - cursorHeight / 2}px`;
}
