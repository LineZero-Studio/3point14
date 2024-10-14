themeSwitch.addEventListener("click", (e) => {
  const elementsToChange = [...document.getElementsByClassName("swiper-slide")];
  for (const element of elementsToChange) {
//    element.classList.toggle("formal");
  }
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
