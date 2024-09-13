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

function inactivateAllProjects() {
  const animationTimerImages = document.getElementsByClassName("animation-timer-image");
  const animationTimerProgressWrappers = document.getElementsByClassName("animation-timer-progress-wrapper");
  const animationTimerInactiveTracks = document.getElementsByClassName("animation-timer-inactive-track");
  const animationTimerActiveTracks = document.getElementsByClassName("animation-timer-active-track");

  for (let i = 0; i < numberOfProjects; i++) {
    animationTimerImages[i].classList.remove("active");
    animationTimerImages[i].dataset.moveBy = "0";
    animationTimerProgressWrappers[i].classList.remove("active");
    animationTimerInactiveTracks[i].classList.remove("active");
    animationTimerActiveTracks[i].classList.remove("active");
  }
}

function getActiveProjectIndex() {
  const projects = document.getElementsByClassName("collection-item");
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].classList.contains('_2')) {
      return i;
    }
  }
}

function getActiveProjectNonDuplicateIndex() {
  const projects = document.getElementsByClassName("collection-item");
  let targetIndex = -1;
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].classList.contains('_2')) {
      targetIndex = (i + numberOfProjects - 1) % numberOfProjects;
      break;
    }
  }

  return targetIndex;
}

function determineActiveProject() {
  const projects = document.getElementsByClassName("collection-item");
  let targetIndex = -1;
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].classList.contains('_2')) {
      targetIndex = (i + numberOfProjects - 1) % numberOfProjects;
      break;
    }
  }

  const animationTimerImages = document.getElementsByClassName("animation-timer-image");
  const animationTimerProgressWrappers = document.getElementsByClassName("animation-timer-progress-wrapper");
  const animationTimerInactiveTracks = document.getElementsByClassName("animation-timer-inactive-track");
  const animationTimerActiveTracks = document.getElementsByClassName("animation-timer-active-track");

  for (let i = 0; i < numberOfProjects; i++) {
    animationTimerImages[(targetIndex + i) % numberOfProjects].dataset.moveBy = i > numberOfProjects / 2 ? i - numberOfProjects : i;
  }

  animationTimerImages[targetIndex].classList.add("active");
  animationTimerProgressWrappers[targetIndex].classList.add("active");
  animationTimerInactiveTracks[targetIndex].classList.add("active");
  activeTrackAddClassFunction = animationTimerActiveTracks[targetIndex].classList.add.bind(animationTimerActiveTracks[targetIndex].classList);
}

function clearProjectAnimationInterval() {
  clearInterval(projectAnimationInterval);
}

function activateProjectAnimationInterval() {
  if (window.innerWidth >= 992) {
    projectAnimationInterval = setInterval(() => {
      if (!projectAnimationWaiting) {
        moveProjectCarouselNext();
        setTimeout(() => {
          inactivateAllProjects();
          determineActiveProject();
        }, 0)
      } else {
        if (activeTrackAddClassFunction !== null) {
          activeTrackAddClassFunction("active");
        }
      }

      projectAnimationWaiting = !projectAnimationWaiting
    }, 2000);
  }
}

themeSwitch.addEventListener("click", (e) => {
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

document.addEventListener('DOMContentLoaded', function () {
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

  dragCarousel(document.getElementById("projectList"));
});

function moveProjectCarouselPrev() {
  const projects = document.getElementsByClassName("collection-item");

  const prevProjectCursor = document.getElementById("prevProjectCursor");
  const nextProjectCursor = document.getElementById("nextProjectCursor");

  prevProjectCursor.style.opacity = '0';
  prevProjectCursor.style.transform = "scale(0)";
  nextProjectCursor.style.opacity = '0';
  nextProjectCursor.style.transform = "scale(0)";

  const minIndex = numberOfProjects === 3 ? -2 : (numberOfProjects === 4 ? -3 : -5);
  const maxIndex = numberOfProjects === 3 ? 6 : (numberOfProjects === 4 ? 8 : 9);

  if (tempHiddenTimeout !== null) {
    clearTimeout(tempHiddenTimeout);
    tempHiddenTimeout = null;
    if (projects.querySelector(`._${maxIndex}`)) {
      projects.querySelector("._10").classList.add(`negative${Math.abs(minIndex)}`);
    } else {
      projects.querySelector("._10").classList.add(`_${maxIndex}`);
    }
    projects.querySelector("._10").classList.remove("_10");
  }

  setTimeout(() => {
    for (let i = 0; i < projects.length; i++) {
      const classNames = projects[i].className.split(' ');

      const classToRemove = classNames.find(className => className.match(/_\d$/) || className.match(/negative\d/));

      const getClassAsNumber = (className) => {
        if (className.match(/_\d$/)) {
          return parseInt(className[1]);
        }
        return 0 - parseInt(className[8]);
      }
      console.log(classToRemove);
      const newNumber = getClassAsNumber(classToRemove) === maxIndex ? minIndex : getClassAsNumber(classToRemove) + 1;
      const newClass = (newNumber < 0 ? "negative" : "_") + Math.abs(newNumber);

      projects[i].classList.remove(classToRemove);
      if (newNumber > getClassAsNumber(classToRemove)) {
        projects[i].classList.add(newClass);
      } else {
        projects[i].classList.add("_10");
        tempHiddenTimeout = setTimeout(() => {
          projects[i].classList.remove("_10");
          projects[i].classList.add(newClass);
          tempHiddenTimeout = null;
        }, 50);
      }
      for (const child of projects[i].children) {
        child.classList.remove(classToRemove);
        child.classList.add(newClass);
      }
    }
  }, 0)
}

function moveProjectCarouselNext() {
  const projects = document.getElementsByClassName("collection-item");

  const prevProjectCursor = document.getElementById("prevProjectCursor");
  const nextProjectCursor = document.getElementById("nextProjectCursor");

  prevProjectCursor.style.opacity = '0';
  prevProjectCursor.style.transform = "scale(0)";
  nextProjectCursor.style.opacity = '0';
  nextProjectCursor.style.transform = "scale(0)";

  const minIndex = numberOfProjects === 3 ? -2 : (numberOfProjects === 4 ? -3 : -5);
  const maxIndex = numberOfProjects === 3 ? 6 : (numberOfProjects === 4 ? 8 : 9);

  if (tempHiddenTimeout !== null) {
    clearTimeout(tempHiddenTimeout);
    tempHiddenTimeout = null;
    if (projects.querySelector(`._${maxIndex}`)) {
      projects.querySelector("._10").classList.add(`negative${Math.abs(minIndex)}`);
    } else {
      projects.querySelector("._10").classList.add(`_${maxIndex}`);
    }
    projects.querySelector("._10").classList.remove("_10");
  }

  setTimeout(() => {
    for (let i = 0; i < projects.length; i++) {
      const classNames = projects[i].className.split(' ');

      const classToRemove = classNames.find(className => className.match(/_\d$/) || className.match(/negative\d/));

      const getClassAsNumber = (className) => {
        if (className.match(/_\d$/)) {
          return parseInt(className[1]);
        }
        return 0 - parseInt(className[8]);
      }
      console.log(classToRemove);
      const newNumber = getClassAsNumber(classToRemove) === minIndex ? maxIndex : getClassAsNumber(classToRemove) - 1;
      const newClass = (newNumber < 0 ? "negative" : "_") + Math.abs(newNumber);

      projects[i].classList.remove(classToRemove);
      if (newNumber < getClassAsNumber(classToRemove)) {
        projects[i].classList.add(newClass);
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

      } else {
        projects[i].classList.add("_10");
        tempHiddenTimeout = setTimeout(() => {
          projects[i].classList.remove("_10");
          projects[i].classList.add(newClass);
          tempHiddenTimeout = null;
        }, 50);
      }
      for (const child of projects[i].children) {
        child.classList.remove(classToRemove);
        child.classList.add(newClass);
      }
    }
  }, 0)
}

const projectPrevBtn = document.getElementById("projectPrevBtn");
const projectNextBtn = document.getElementById("projectNextBtn");

projectPrevBtn.addEventListener("click", function () {
  if (buttonsDebounced) return;
  buttonsDebounced = true;
  setTimeout(() => {
    buttonsDebounced = false;
  }, 500);
  moveProjectCarouselPrev();
});

projectNextBtn.addEventListener("click", function () {
  if (buttonsDebounced) return;
  buttonsDebounced = true;
  setTimeout(() => {
    buttonsDebounced = false;
  }, 500);
  moveProjectCarouselNext();
});

function moveCursor(cursorElement) {
  const cursorWidth = cursorElement.clientWidth;
  const cursorHeight = cursorElement.clientHeight;
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  cursorElement.style.left = `${mouseX - cursorWidth / 2}px`;
  cursorElement.style.top = `${mouseY - cursorHeight / 2}px`;
}

document.addEventListener('mousemove', function (event) {
  moveCursor(prevProjectCursor);
  moveCursor(nextProjectCursor);
  moveCursor(viewProjectCursor);
});

const getRawLeftOffset = (index) => {
  return index * 68.76 - 65.26;
}

const getFormalLeftOffset = (index) => {
  switch (index) {
    case 0:
      return 20;
    case 1:
      return 3.5;
    case 2:
      return 18.41;
    case 3:
    case 4:
      return 80;
    default:
      return 50;
  }
}

const getFormalTopOffset = (index) => {
  return index == 2 ? 0 : 10.02;
}

const getFormalProjectHeight = (index) => {
  return index == 2 ? 94.9 : 56.64;
}

const getFormalImageHeight = (index) => {
  return index == 2 ? 79.49 : 56.64;
}

const getFormalProjectWidth = (index) => {
  switch (index) {
    case 1:
    case 3:
      return 16.5;
    case 2:
      return 62.94;
    default:
      return 0;
  }
}

const getFormalProjectZIndex = (index) => {
  switch (index) {
    case 2:
      return 4;
    case 1:
    case 3:
      return 2;
    case 0:
    case 4:
      return 1;
    default:
      return 0;
  }
}

const getLeftOffset = (index) => {
  if (isFormal) {
    return getFormalLeftOffset(index);
  }
  return getRawLeftOffset(index);
}

const getRawProjectSpacing = () => {
  return 68.76;
}

const getFormalProjectSpacing = () => {
  return (getFormalProjectWidth(1) + getFormalProjectWidth(2)) / 2;
}

const getProjectSpacing = () => {
  if (isFormal) {
    return getFormalProjectSpacing();
  }
  return getRawProjectSpacing();
}

function dragCarousel(elmnt) {
  const projects = document.getElementsByClassName("collection-item");
  let zeroImageIndex = [].indexOf.call(projects, document.querySelector("._0"));

  const minIndex = numberOfProjects === 3 ? -2 : (numberOfProjects === 4 ? -3 : -5);
  const maxIndex = numberOfProjects === 3 ? 6 : (numberOfProjects === 4 ? 8 : 9);

  let lastDragPosition = 0;

  let lastTouchTime;
  let lastTouchX;
  let secondToLastTouchTime;
  let secondToLastTouchX;

  elmnt.ontouchstart = touchStart;

  function touchStart(e) {
    e = e || window.event;
    e.preventDefault();

    startTime = Date.now();

    if (isFormal) {
      clearProjectAnimationInterval();
      projectAnimationWaiting = false;
    }

    zeroImageIndex = [].indexOf.call(projects, document.querySelector("._0"));

    for (let i = 0; i < projects.length; i++) {
      projects[i].style.transitionDuration = "200ms";
      projects[i].querySelector("img").style.transitionDuration = "200ms";
    }

    elmnt.dataset.mouseDownAt = e.changedTouches[0].clientX / window.innerWidth;
    document.ontouchend = closeDragElement;
    document.ontouchmove = touchDrag;
  }

  function touchDrag(e) {
    e = e || window.event;

    const mouseDownAt = parseFloat(elmnt.dataset.mouseDownAt);
    const currentMousePosition = e.changedTouches[0].clientX / window.innerWidth;

    if (lastTouchX !== undefined && lastTouchTime !== undefined && lastTouchTime !== Date.now()) {
      secondToLastTouchTime = lastTouchTime;
      secondToLastTouchX = lastTouchX;
    }

    lastTouchX = currentMousePosition;
    lastTouchTime = Date.now();

    if (isFormal) {
      const diff = (currentMousePosition - mouseDownAt) * 100 / ((getFormalProjectWidth(2) + getFormalProjectWidth(1)) / 2);

      for (let i = 0; i < projects.length; i++) {
        const diffFloor = diff < 0 ? Math.ceil(diff) : Math.floor(diff);
        const diffCeil = diff < 0 ? Math.floor(diff) : Math.ceil(diff);
        const offsetIndex = i - zeroImageIndex < minIndex ? i - zeroImageIndex + projects.length : (i - zeroImageIndex > maxIndex ? i - zeroImageIndex - projects.length : i - zeroImageIndex);
        projects[i].style.left = `${getLeftOffset(offsetIndex + diffFloor) + ((getLeftOffset(offsetIndex + diffCeil) - getLeftOffset(offsetIndex + diffFloor)) * (Math.abs(diff) - Math.abs(diffFloor)))}vw`;
        projects[i].style.top = `${getFormalTopOffset(offsetIndex + diffFloor) + ((getFormalTopOffset(offsetIndex + diffCeil) - getFormalTopOffset(offsetIndex + diffFloor)) * (Math.abs(diff) - Math.abs(diffFloor)))}vw`;
        projects[i].style.height = `${getFormalProjectHeight(offsetIndex + diffFloor) + ((getFormalProjectHeight(offsetIndex + diffCeil) - getFormalProjectHeight(offsetIndex + diffFloor)) * (Math.abs(diff) - Math.abs(diffFloor)))}vw`;
        projects[i].querySelector("img").style.height = `${getFormalImageHeight(offsetIndex + diffFloor) + ((getFormalImageHeight(offsetIndex + diffCeil) - getFormalImageHeight(offsetIndex + diffFloor)) * (Math.abs(diff) - Math.abs(diffFloor)))}vw`;
        projects[i].style.width = `${getFormalProjectWidth(offsetIndex + diffFloor) + ((getFormalProjectWidth(offsetIndex + diffCeil) - getFormalProjectWidth(offsetIndex + diffFloor)) * (Math.abs(diff) - Math.abs(diffFloor)))}vw`;
        projects[i].style.zIndex = `${getFormalProjectZIndex(offsetIndex + Math.round(diff))}`;
      }
    } else {
      const diff = (currentMousePosition - mouseDownAt) * 100;

      for (let i = 0; i < projects.length; i++) {
        const offsetIndex = i - zeroImageIndex < minIndex ? i - zeroImageIndex + projects.length : (i - zeroImageIndex > maxIndex ? i - zeroImageIndex - projects.length : i - zeroImageIndex);
        projects[i].style.left = `${getLeftOffset(offsetIndex) + diff}vw`;
      }
    }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.ontouchend = null;
    document.ontouchmove = null;

    const frameTime = lastTouchTime - secondToLastTouchTime;

    const velocity = (lastTouchX - secondToLastTouchX) / frameTime;
    const frictionCoefficient = 0.0003;

    const velocityThreshold = 0.001;

    if (velocity > velocityThreshold || velocity < -velocityThreshold) {
      const stoppingTime = Math.log(velocityThreshold / Math.abs(velocity)) / Math.log(frictionCoefficient) * 1000;
      const stoppingDistance = Math.min(isFormal ? 0.3 : 1, Math.max(isFormal ? -0.3 : -1, velocity * (1 - Math.pow(frictionCoefficient, stoppingTime)) / (1 - frictionCoefficient) * 300));

      console.log(stoppingTime, stoppingDistance);

      for (let i = 0; i < projects.length; i++) {
        projects[i].style.transitionDuration = `${stoppingTime}ms`;
        projects[i].querySelector("img").style.transitionDuration = `${stoppingTime}ms`;
        projects[i].style.transitionTimingFunction = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        projects[i].querySelector("img").style.transitionTimingFunction = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      }

      if (isFormal) {
        const diff = stoppingDistance * 100 / ((getFormalProjectWidth(2) + getFormalProjectWidth(1)) / 2);

        for (let i = 0; i < projects.length; i++) {
          const diffFloor = diff < 0 ? Math.ceil(diff) : Math.floor(diff);
          const diffCeil = diff < 0 ? Math.floor(diff) : Math.ceil(diff);
          const offsetIndex = i - zeroImageIndex < minIndex ? i - zeroImageIndex + projects.length : (i - zeroImageIndex > maxIndex ? i - zeroImageIndex - projects.length : i - zeroImageIndex);
          projects[i].style.left = `${getLeftOffset(offsetIndex + diffFloor) + ((getLeftOffset(offsetIndex + diffCeil) - getLeftOffset(offsetIndex + diffFloor)) * (Math.abs(diff) - Math.abs(diffFloor)))}vw`;
          projects[i].style.top = `${getFormalTopOffset(offsetIndex + diffFloor) + ((getFormalTopOffset(offsetIndex + diffCeil) - getFormalTopOffset(offsetIndex + diffFloor)) * (Math.abs(diff) - Math.abs(diffFloor)))}vw`;
          projects[i].style.height = `${getFormalProjectHeight(offsetIndex + diffFloor) + ((getFormalProjectHeight(offsetIndex + diffCeil) - getFormalProjectHeight(offsetIndex + diffFloor)) * (Math.abs(diff) - Math.abs(diffFloor)))}vw`;
          projects[i].querySelector("img").style.height = `${getFormalImageHeight(offsetIndex + diffFloor) + ((getFormalImageHeight(offsetIndex + diffCeil) - getFormalImageHeight(offsetIndex + diffFloor)) * (Math.abs(diff) - Math.abs(diffFloor)))}vw`;
          projects[i].style.width = `${getFormalProjectWidth(offsetIndex + diffFloor) + ((getFormalProjectWidth(offsetIndex + diffCeil) - getFormalProjectWidth(offsetIndex + diffFloor)) * (Math.abs(diff) - Math.abs(diffFloor)))}vw`;
          projects[i].style.zIndex = `${getFormalProjectZIndex(offsetIndex + Math.round(diff))}`;
        }
      } else {
        const diff = stoppingDistance * 100;

        for (let i = 0; i < projects.length; i++) {
          const offsetIndex = i - zeroImageIndex < minIndex ? i - zeroImageIndex + projects.length : (i - zeroImageIndex > maxIndex ? i - zeroImageIndex - projects.length : i - zeroImageIndex);
          projects[i].style.left = `${getLeftOffset(offsetIndex) + diff}vw`;
        }
      }

      setTimeout(() => {
        const mouseDownAt = parseFloat(document.getElementById("projectList").dataset.mouseDownAt);

        const projects = document.getElementsByClassName("collection-item");
        const secondProject = document.querySelector("._2");
        const secondProjectOffset = parseFloat(secondProject.style.left);
        const targetSecondProjectOffset = getLeftOffset(2);
        const diff = isFormal ? (lastDragPosition - mouseDownAt) * 100 / ((getFormalProjectWidth(2) + getFormalProjectWidth(1)) / 2) : (secondProjectOffset - targetSecondProjectOffset) / getProjectSpacing();
        const moveBy = Math.round(diff);
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


        for (let i = 0; i < projects.length; i++) {
          projects[i].style.left = "";
          projects[i].style.transitionTimingFunction = "";
          projects[i].querySelector("img").style.transitionTimingFunction = "";
          if (isFormal) {
            projects[i].style.top = "";
            projects[i].style.height = "";
            projects[i].querySelector("img").style.height = "";
            setTimeout(() => {
              projects[i].querySelector("img").style.transitionDuration = "";
            }, 200);
            projects[i].style.width = "";
            projects[i].style.zIndex = "";
          }
          setTimeout(() => {
            projects[i].style.transitionDuration = "";
          }, 200);
        }

        if (moveBy > 0) {
          for (let i = 0; i < moveBy; i++) {
            moveProjectCarouselPrev();
          }
        } else if (moveBy < 0) {
          for (let i = 0; i < Math.abs(moveBy); i++) {
            moveProjectCarouselNext();
          }
        }
      }, stoppingTime);

    } else {
      const mouseDownAt = parseFloat(document.getElementById("projectList").dataset.mouseDownAt);

      const projects = document.getElementsByClassName("collection-item");
      const secondProject = document.querySelector("._2");
      const secondProjectOffset = parseFloat(secondProject.style.left);
      const targetSecondProjectOffset = getLeftOffset(2);
      const diff = isFormal ? (lastDragPosition - mouseDownAt) * 100 / ((getFormalProjectWidth(2) + getFormalProjectWidth(1)) / 2) : (secondProjectOffset - targetSecondProjectOffset) / getProjectSpacing();
      const moveBy = Math.round(diff);

      for (let i = 0; i < projects.length; i++) {
        projects[i].style.left = "";
        if (isFormal) {
          projects[i].style.top = "";
          projects[i].style.height = "";
          projects[i].querySelector("img").style.height = "";
          setTimeout(() => {
            projects[i].querySelector("img").style.transitionDuration = "";
          }, 200);
          projects[i].style.width = "";
          projects[i].style.zIndex = "";
        }
        setTimeout(() => {
          projects[i].style.transitionDuration = "";
        }, 200);
      }

      if (moveBy > 0) {
        for (let i = 0; i < moveBy; i++) {
          moveProjectCarouselPrev();
        }
      } else if (moveBy < 0) {
        for (let i = 0; i < Math.abs(moveBy); i++) {
          moveProjectCarouselNext();
        }
      }
    }
  }
}
