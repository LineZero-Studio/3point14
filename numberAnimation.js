function wrapCharactersInSpan(element) {
    Array.from(element.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const newContent = Array.from(node.textContent).map(char => {
                return `<span class="shifted-down number-span">${char}</span>`;
            }).join('');
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newContent;
            node.replaceWith(...tempDiv.childNodes);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            wrapCharactersInSpan(node);
        }
    });
}

const targetElement = document.querySelector('.hero-numbers');
wrapCharactersInSpan(targetElement);

function removeShiftedDownClass() {
    const elements = Array.from(document.querySelectorAll('.shifted-down'));

    let index = 0;

    const removeClassInterval = setInterval(() => {
        if (index >= elements.length) {
            clearInterval(removeClassInterval);
            return;
        }

        elements[index].classList.remove('shifted-down');
        index++;
    }, 150);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        removeShiftedDownClass();
    }, 0);
});
