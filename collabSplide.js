function splide() {

    let splides = $('.collabs-splide');
    for ( let i = 0, splideLength = splides.length; i < splideLength; i++ ) {
        new Splide( splides[ i ], {
            perPage: 3, 
            //perMove: 0.5,
            arrows: false,
            pagination: false,
            focus: 0,
            direction: 'ltr',
            speed : 600, // transition speed in miliseconds
            drag: 'free',
            autoWidth: false, // for cards with differing widths
            type: 'loop',
            autoScroll: {
                autoStart: true,
                speed: 0.4,
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
                    perPage: 2.59,
                },
            }
        } ).mount( window.splide.Extensions );
    }

}
splide();
