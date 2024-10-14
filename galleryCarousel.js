var totalGallerySlide = $('.gallery-swiper-slide').length;
var totalProgressSlide = $('.progress-swiper-slide').length;

const gallerySwiperElement = document.getElementById("gallerySwiper");

var gallerySwiper = new Swiper(gallerySwiperElement, {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".gallery-swiper-next",
        prevEl: ".gallery-swiper-previous",
    }
});

gallerySwiper.on('slideChange', function() {
    var current = gallerySwiper.realIndex + 1;
    if (current > totalGallerySlide)
        current = 1;
    const galleryProgress = document.getElementById("galleryProgress");
    galleryProgress.style.width = (current / totalGallerySlide * 100) + "%";
});

const progressSwiperElement = document.getElementById("progressSwiper");

var progressSwiper = new Swiper(progressSwiperElement, {
    slidesPerView: "auto",
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: ".progress-swiper-next",
        prevEl: ".progress-swiper-previous",
    }
});

progressSwiper.on('slideChange', function() {
    var current = progressSwiper.realIndex + 1;
    if (current > totalProgressSlide)
        current = 1;
    const progressProgress = document.getElementById("progressProgress");
    progressProgress.style.width = (current / totalProgressSlide * 100) + "%";
});


themeSwitch.addEventListener("click", function() {
    gallerySwiper.params.spaceBetween = (gallerySwiper.params.spaceBetween == 50) ? 10 : 50;
    gallerySwiper.update(true);
    progressSwiper.params.spaceBetween = (progressSwiper.params.spaceBetween == 50) ? 10 : 50;
    progressSwiper.update(true);
});
