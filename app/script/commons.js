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
        const moveToSection = elem => {
            const section = $(`.${elem.dataset.path}`);
            
            toggleButton.removeClass("toggle-active");
            headerMenu.removeClass("nav-menu_mobile");

            $([document.documentElement, document.body]).animate({
                scrollTop: section.offset().top
            }, 1000);
        };

        toggleButton.on("click", function() {
            $(this).toggleClass("toggle-active");
            headerMenu.toggleClass("nav-menu_mobile");
        })

        $(document).on("click", function({target}) {
            if (target.closest(".toggle-button") || target.classList.contains("nav-menu")) {
                return;
            } else {
                toggleButton.removeClass("toggle-active");
                headerMenu.removeClass("nav-menu_mobile");
            }
        });

        /*Menu routes*/

        headerMenu.on("click", ({target}) => {
            if (!target.closest(".nav-menu__item")) return;

            moveToSection(target);
        });

        /*Scrolling up*/ 

        const checkScrollingFirstScreen = () => {
            const firsrScreen = document.querySelector(".slider");

            if (pageYOffset >= firsrScreen.offsetHeight) {
                scrollTopButton.css("display", "block");
            }else {
                scrollTopButton.css("display", "none");
            }
        }

        $(document).on("scroll", () => {
            checkScrollingFirstScreen();
        });

        scrollTopButton.on("click", () => {
            $([document.documentElement, document.body]).animate({
                scrollTop: 0
            }, 1000);
        });

        /*Project filtering*/

        const showProject = projectName => {
            switch (projectName) {
                case "all":
                    $(".project").removeClass("hide-project");
                    break;
                case "mobile-app":
                case "photography":
                case "web-design":
                case "illustration":
                    $(".project").addClass("hide-project");
                    $(`.project[data-value=${projectName}]`).removeClass("hide-project");
                    break;
            }
        };
        const filterProjects = ({target}) => {
            const linkNav = target.closest(".projects-nav__link");

            showProject(linkNav.dataset.presentation);
        };

        $(".projects-nav").on("click", filterProjects);

        /*Project loading*/

        const postsData = [                    // A static array of objects. Instead of this array, we could receive data from the server. And also from them to build a markup.
            {
                "imgUrl": "./images/projects/project4.jpg",
                "title": "Quam Nutamus Farum",
                "description": "Graphic Design, Mock-Up",
                "value": "web-design"
            },
            {
                "imgUrl": "./images/projects/project2.jpg",
                "title": "Claritas Etiam Processus",
                "description": "Photography, Nature",
                "value": "photography"
            },
            {
                "imgUrl": "./images/projects/project3.jpg",
                "title": "Quam Nutamus Farum",
                "description": "Graphic Design, Mock-Up",
                "value": "web-design"
            },
            {
                "imgUrl": "./images/projects/project5.jpg",
                "title": "Claritas Etiam Processus",
                "description": "Photography, Nature",
                "value": "photography"
            }
        ];
        const createProject = ({imgUrl, title, description, value}) => {
            const li = document.createElement("li");
            const liInner = `
            <div class="project__preview" style="background-image: url(${imgUrl})">
                <div class="project__preview-cover">
                    <div class="project__preview-icons">
                        <a href="#!" class="project__preview-link">
                            <svg xmlns="http://www.w3.org/2000/svg" class="project__preview-icon" viewBox="0 0 26 26">
                                <g><g>
                                    <path d="M23.5 11.242l-1.927 1.928-3.187 3.189c-.153.17-.34.324-.511.46a6.24 6.24 0 0 1-6.153.905 6.038 6.038 0 0 1-2.08-1.365l2.642-2.644a2.446 2.446 0 0 0 3.46 0l2.028-2.029L20.857 8.6a2.447 2.447 0 1 0-3.46-3.462l-2.454 2.456a7.068 7.068 0 0 0-4.908-.376l4.72-4.723c2.404-2.405 6.341-2.405 8.744 0 2.42 2.42 2.42 6.343 0 8.748zm-7.654 7.607l-4.618 4.672c-2.403 2.406-6.34 2.406-8.744 0-2.403-2.404-2.403-6.343 0-8.747l5.113-5.118c.068-.067.154-.153.239-.221a6.191 6.191 0 0 1 6.426-1.142c.75.29 1.465.75 2.079 1.363l-2.642 2.645a2.446 2.446 0 0 0-3.46 0l-5.113 5.115a2.447 2.447 0 1 0 3.46 3.463l2.352-2.355c2.011.803 2.557.87 4.908.325z"/>
                                    <path d="M23.5 11.242l-1.927 1.928-3.187 3.189c-.153.17-.34.324-.511.46a6.24 6.24 0 0 1-6.153.905 6.038 6.038 0 0 1-2.08-1.365l2.642-2.644a2.446 2.446 0 0 0 3.46 0l2.028-2.029L20.857 8.6a2.447 2.447 0 1 0-3.46-3.462l-2.454 2.456a7.068 7.068 0 0 0-4.908-.376l4.72-4.723c2.404-2.405 6.341-2.405 8.744 0 2.42 2.42 2.42 6.343 0 8.748zm-7.654 7.607l-4.618 4.672c-2.403 2.406-6.34 2.406-8.744 0-2.403-2.404-2.403-6.343 0-8.747l5.113-5.118c.068-.067.154-.153.239-.221a6.191 6.191 0 0 1 6.426-1.142c.75.29 1.465.75 2.079 1.363l-2.642 2.645a2.446 2.446 0 0 0-3.46 0l-5.113 5.115a2.447 2.447 0 1 0 3.46 3.463l2.352-2.355c2.011.803 2.557.87 4.908.325z"/>
                                </g></g>
                            </svg>
                        </a>
                        <a href="#!" class="project__preview-link">
                            <svg xmlns="http://www.w3.org/2000/svg" class="project__preview-icon" viewBox="0 0 26 25">
                                <g><g>
                                    <path d="M17.417 7.847c.318.644.047 1.42-.607 1.734-.185.087-.381.13-.576.13-.487 0-.954-.267-1.182-.728a4.147 4.147 0 0 0-3.748-2.31c-.726 0-1.315-.579-1.315-1.296 0-.714.589-1.295 1.315-1.295 2.62 0 4.964 1.443 6.113 3.765zm8.04 16.325a1.647 1.647 0 0 1-1.164.474 1.65 1.65 0 0 1-1.163-.474L18.795 19.9a11.218 11.218 0 0 1-6.836 2.317C5.793 22.218.777 17.276.777 11.202S5.793.186 11.96.186 23.14 5.128 23.14 11.202c0 2.37-.77 4.562-2.068 6.361l4.383 4.318a1.602 1.602 0 0 1 0 2.29zM11.96 19.627c2.104 0 4.03-.756 5.521-2.003.46-.384.874-.819 1.243-1.288a8.288 8.288 0 0 0 1.786-5.134c0-4.645-3.836-8.424-8.55-8.424-4.715 0-8.551 3.78-8.551 8.424 0 4.645 3.836 8.424 8.55 8.425z"/>
                                    <path d="M17.417 7.847c.318.644.047 1.42-.607 1.734-.185.087-.381.13-.576.13-.487 0-.954-.267-1.182-.728a4.147 4.147 0 0 0-3.748-2.31c-.726 0-1.315-.579-1.315-1.296 0-.714.589-1.295 1.315-1.295 2.62 0 4.964 1.443 6.113 3.765zm8.04 16.325a1.647 1.647 0 0 1-1.164.474 1.65 1.65 0 0 1-1.163-.474L18.795 19.9a11.218 11.218 0 0 1-6.836 2.317C5.793 22.218.777 17.276.777 11.202S5.793.186 11.96.186 23.14 5.128 23.14 11.202c0 2.37-.77 4.562-2.068 6.361l4.383 4.318a1.602 1.602 0 0 1 0 2.29zM11.96 19.627c2.104 0 4.03-.756 5.521-2.003.46-.384.874-.819 1.243-1.288a8.288 8.288 0 0 0 1.786-5.134c0-4.645-3.836-8.424-8.55-8.424-4.715 0-8.551 3.78-8.551 8.424 0 4.645 3.836 8.424 8.55 8.425z"/>
                                </g></g>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <p class="project-title">
                    ${title}
                </p>
                <p class="project-desc">
                    ${description}
                </p>
            </div>`;

            li.classList.add("project");
            li.dataset.value = value;
            li.insertAdjacentHTML("beforeend", liInner);

            return li
        }
        const loadProjects = projectColl => {
            projectColl.forEach(project => $(".projects-list").append(createProject(project)));
        };

        $(".project-button").on("click", () => {
            loadProjects(postsData);
        });

        /*Video player*/

        const createPopup = textPopup => {
            const popup = document.createElement("div");
            const popupInner = `<p class="popup__text">${textPopup}</>`;

            popup.classList.add("popup");
            popup.insertAdjacentHTML("beforeend", popupInner);

            return popup;
        };
        const showAlert = () => {     
            if (document.querySelector(".video-present > .popup")) return; 

            const popupAlert = createPopup("No videos uploaded yet.");
            $(".video-present").append(popupAlert);
            setTimeout(() => popupAlert.remove(), 2500);
        };

        $(".video-present-play").on("click", showAlert);

    });
})();