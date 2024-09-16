document.addEventListener('DOMContentLoaded', function() {
    let currentWord = "possibilities";
    const words = ["possibilities", "collaborations", "industries", "innovations", "synergy"];
    const className = 'expanded';

    setInterval(() => {
        for (const element of document.getElementsByClassName("currentWord")) {
            element.classList.toggle(className);
            if (element.classList.contains(className)) {
                currentWord = words[(words.indexOf(currentWord) + 1 === projects.length ? 0 : words.indexOf(currentWord) + 1)]
            }
        }
    }, 2000);
});
