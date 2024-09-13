let numberOfLogos = 0; // Keeps track of unique logos

document.addEventListener('DOMContentLoaded', function () {
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
});
