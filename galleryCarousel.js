let galleryOffsets = [];
let galleryIndex = 0;

function updateChildOffsets(element) {
    galleryOffsets = [];
    const children = element.children;
    
    if (children.length === 0) {
        console.log("No children to check.");
        return;
    }

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
            galleryOffsets.push(childRect.left);
        }
    }
}

function galleryPrev(element) {
    galleryIndex = galleryIndex + galleryOffsets.length - 1 % galleryOffsets.length;
    element.style.transform = `translateX(${galleryOffsets[galleryIndex]}px);`;
}

function galleryNext(element) {
    galleryIndex = galleryIndex + 1 % galleryOffsets.length;
    element.style.transform = `translateX(${galleryOffsets[galleryIndex]}px);`;
}

themeSwitch.addEventListener("click", (e) => {
    setTimeout(() => {
        updateChildOffsets(galleryCarousel);
    }, 2000);
});

window.addEventListener('resize', () => {
    updateChildOffsets(galleryCarousel);
});

// Usage example
const galleryCarousel = document.getElementById('galleryCarousel'); // Replace with your element ID
logChildOffsets(galleryCarousel);
