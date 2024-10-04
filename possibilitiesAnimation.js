document.addEventListener('DOMContentLoaded', function() {
    let currentWord = "possibilities";
    const words = ["possibilities", "collaborations", "industries", "innovations", "synergy"];
    const className = 'expanded';

    const cycleTime = 3000;

    setInterval(() => {
        for (const element of document.getElementsByClassName(currentWord)) {
            if (element.classList.contains(className)) {
                setTimeout(() => {
                    element.classList.toggle(className);
                    currentWord = words[(words.indexOf(currentWord) + 1 === words.length ? 0 : words.indexOf(currentWord) + 1)]
                }, (cycleTime / 2) - 600);
            } else {
                for (const element of words.map(word => document.getElementsByClassName(word)[0])) {
                    element.classList.remove(className);
                }
                element.classList.toggle(className);
            }
        }
    }, cycleTime / 2);
});
