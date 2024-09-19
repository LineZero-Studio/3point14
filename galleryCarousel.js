let galleryOffsets = [];
let galleryIndex = 0;
let progressOffsets = [];
let progressIndex = [];

function getChildOffsets(element) {
    if (!element) return [];

    const children = element.children;

    if (children.length === 0) return [];
    if (element.scrollWidth <= window.innerWidth) return [];

    let offsets = [];

    const lastChild = children[children.length - 1];
    const lastChildRect = lastChild.getBoundingClientRect();
    const lastChildRight = lastChildRect.right;
    const viewportWidth = window.innerWidth;

    const currentOffset = element.style.transform.substring(12, element.style.transform.length - 4);

    const rightOffset = Math.abs(viewportWidth - lastChildRight) - currentOffset;

    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const childRect = child.getBoundingClientRect();

        // Check if the left offset of the child is less than the right offset
        if (childRect.left - currentOffset < rightOffset) {
            offsets.push(childRect.left);
        }
    }

    offsets.push(rightOffset + currentOffset);

    return offsets;
}

function updateChildOffsets() {
    galleryOffsets = getChildOffsets(galleryCarousel);
    progressOffsets = getChildOffsets(progressCarousel);
}

function galleryPrev(element, progressElement) {
    let offsets, index;
    if (element.id === "galleryCarousel") {
        offsets = galleryOffsets;
        galleryIndex = (galleryIndex + offsets.length - 1) % offsets.length;
        index = galleryIndex;
    } else {
        offsets = progressOffsets;
        progressIndex = (progressIndex + offsets.length - 1) % offsets.length;
        index = progressIndex;
    }
    element.style.transform = `translateX(-${offsets[index]}px)`;
    progressElement.style.width = ((index + 1) / offsets.length * 100) + "%";
}

function galleryNext(element, progressElement) {
    let offsets, index;
    if (element.id === "galleryCarousel") {
        offsets = galleryOffsets;
        galleryIndex = (galleryIndex + 1) % offsets.length;
        index = galleryIndex;
    } else {
        offsets = progressOffsets;
        progressIndex = (progressIndex + 1) % offsets.length;
        index = progressIndex;
    }
    element.style.transform = `translateX(-${offsets[index]}px)`;
    progressElement.style.width = ((index + 1) / offsets.length * 100) + "%";
}

themeSwitch.addEventListener("click", (e) => {
    setTimeout(() => {
        updateChildOffsets(galleryCarousel);
    }, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
    const galleryCarousel = document.getElementById('galleryCarousel');
    const galleryControls = document.getElementById('galleryControls');
    const galleryProgress = document.getElementById('galleryProgress');
    const galleryPrevBtn = document.getElementById('galleryPrev');
    const galleryNextBtn = document.getElementById('galleryNext');
    const progressCarousel = document.getElementById('progressCarousel');
    const progressControls = document.getElementById('progressControls');
    const progressProgress = document.getElementById('progressProgress');
    const progressPrevBtn = document.getElementById('progressPrev');
    const progressNextBtn = document.getElementById('progressNext');

    galleryPrevBtn.addEventListener('click', () => {
        galleryPrev(galleryCarousel, galleryProgress);
    });
    galleryNextBtn.addEventListener('click', () => {
        galleryNext(galleryCarousel, galleryProgress);
    });
    progressPrevBtn.addEventListener('click', () => {
        galleryPrev(progressCarousel, progressProgress);
    });
    progressNextBtn.addEventListener('click', () => {
        galleryPrev(progressCarousel, progressProgress);
    });

    updateChildOffsets();
    if (galleryOffsets.length === 0) {
        galleryControls.style.display = 'none';
    }
    if (progressOffsets.length === 0) {
        progressControls.style.display = 'none';
    }

    window.addEventListener('resize', () => {
        updateChildOffsets();
        if (galleryOffsets.length === 0) {
            galleryControls.style.display = 'none';
        }
        if (progressOffsets.length === 0) {
            progressControls.style.display = 'none';
        }
    });
});
