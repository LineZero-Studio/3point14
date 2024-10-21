function fetchAPIData() {
    fetch('https://api.linezerostudio.com/clientFeed?clientName=3point14', {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Convert response to JSON
        })
        .then(data => {
            console.log(data);
            const wrapper = document.getElementById("socialWrapper");
            for (const post of data.data) {
                const newDiv = document.createElement('div');
                newDiv.classList.add('swiper-slide');
                newDiv.classList.add('social-swiper-slide');
                newDiv.classList.add('receives-formal');
                newDiv.classList.add('loaded');

                const linkElement = document.createElement('a');
                linkElement.href = post.permalink;
                linkElement.setAttribute("target", "_blank");

                const img = document.createElement('img');
                img.classList.add("social-swiper-image");
                img.classList.add("receives-formal");
                img.src = post.media_url;

                linkElement.appendChild(img);
                newDiv.appendChild(linkElement);
                wrapper.appendChild(newDiv);
            }

            var socialSwiper = new Swiper(".social-swiper", {
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                loop: true,
            });

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

fetchAPIData();
