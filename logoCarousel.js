function logoSplide() {

    let splides = $('.logos');
    for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
        new Splide(splides[i], {
            perPage: 3,
            //perMove: 0.5,
            arrows: false,
            pagination: false,
            focus: 0,
            direction: 'ltr',
            gap: '3vw',
            speed: 600, // transition speed in miliseconds
            drag: 'free',
            autoWidth: true, // for cards with differing widths
            type: 'loop',
            autoScroll: {
                autoStart: true,
                speed: 1,
                pauseOnHover: false,
                pauseOnFocus: true,
            },
            intersection: {
                inView: {
                    autoScroll: true,
                },
                outView: {
                    autoScroll: false,
                },
            },
            breakpoints: {
                991: {
                    // Tablet
                    perPage: 1.7,
                    gap: '4vw',
                },
                767: {
                    // Mobile Landscape
                    perPage: 1.5,
                    gap: '0vw',
                    autoScroll: {
                        autoStart: true,
                        speed: 0.2,
                        pauseOnHover: false,
                        pauseOnFocus: true,
                    },

                },
                479: {
                    perPage: 1.2,
                    gap: '0vw',
                    // Mobile Portrait
                }
            }
        }).mount(window.splide.Extensions);
    }

}
logoSplide();
