;(function() {
    document.addEventListener("DOMContentLoaded", () => {

        /*Initialization and setup of sliders.*/

        $(".slider-list").slick({
            "dots": true,
            "prevArrow": $(".slider-arrows__left"),
            "nextArrow": $(".slider-arrows__right"),
            "dotsClass": "slider-dots"
        });

        $(".post-list").slick({
            "dots": false,
            "prevArrow": $(".post-arrows__item_left"),
            "nextArrow": $(".post-arrows__item_right"),
            "slidesToShow": 3,
            "centerPadding": "60px",
            "responsive": [
                {
                    "breakpoint": 850,
                    "settings": {
                        slidesToShow: 2
                    }
                },
                {
                    "breakpoint": 650,
                    "settings": {
                        slidesToShow: 1
                    }
                }
            ]
        });

        /*Menu toggle switch*/

        const toggleButton = $(".toggle-button");
        const headerMenu = $(".nav-menu");
        const scrollTopButton = $(".scroll-top-button");
        const scrollTo = (elem, to, smooth) => {
            $(elem).animate({
                scrollTop: to.offset().top
            }, smooth);
        };
        const moveToSection = elem => {
            const targetPath = elem.dataset.path;
            const section = $(`.${targetPath}`);
            
            toggleButton.removeClass("toggle-active");
            headerMenu.removeClass("nav-menu_mobile");

            $([document.documentElement, document.body]).animate({
                scrollTop: section.offset().top
            }, 2000);
        };

        toggleButton.on("click", function() {
            $(this).toggleClass("toggle-active");
            headerMenu.toggleClass("nav-menu_mobile");
        })

        $(document).on("click", function(e) {
            const {target} = e;

            if (target.closest(".toggle-button") || target.classList.contains("nav-menu")) {
                return 
            } else {
                toggleButton.removeClass("toggle-active");
                headerMenu.removeClass("nav-menu_mobile");
            }
        });

        /*Menu routes*/

        headerMenu.on("click", (e) => {
            const {target} = e;

            if (!target.closest(".nav-menu__item")) return;

            moveToSection(target);
        });

        /*Scrolling up*/ 

        scrollTopButton.on("click", () => {
            $([document.documentElement, document.body]).animate({
                scrollTop: 0
            }, 2000);
        });

    });
})();