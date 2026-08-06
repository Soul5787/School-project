/* =========================================================
   APP VIEW ROUTER
   (Submit a Concern / Track Ticket full-screen page)
   ========================================================= */

function initializeRouter() {

    const appView =
        document.getElementById("app-view");

    if (!appView) {
        return;
    }


    function applyRoute() {

        const isAppView =
            window.location.hash.startsWith("#/concern");

        appView.classList.toggle("is-active", isAppView);

        document.body.classList.toggle("app-view-open", isAppView);

        if (isAppView) {

            window.scrollTo({ top: 0 });

        }

    }


    document.querySelectorAll("[data-route]").forEach(function(link) {

        link.addEventListener("click", function(event) {

            event.preventDefault();

            const route =
                link.getAttribute("data-route");

            window.location.hash =
                route === "concern" ? "/concern" : "/";

        });

    });


    window.addEventListener("hashchange", applyRoute);

    applyRoute();

}

initializeRouter();


/* =========================================================
   APP VIEW TABS
   (New Ticket / Track Ticket)
   ========================================================= */

function showAppTab(tab) {

    const submitTab =
        document.getElementById("submit-tab");

    const trackTab =
        document.getElementById("track-tab");

    const links =
        document.querySelectorAll(".sidebar__link[data-tab]");

    if (!submitTab || !trackTab) {
        return;
    }


    submitTab.style.display =
        tab === "submit" ? "block" : "none";

    trackTab.style.display =
        tab === "track" ? "block" : "none";


    links.forEach(function(link) {

        link.classList.toggle(
            "active",
            link.getAttribute("data-tab") === tab
        );

    });

}


/* =========================
   SCROLL REVEAL
   ========================= */

const revealElements =
    document.querySelectorAll(
        ".section-title, " +
        ".section-content, " +
        ".feature-card, " +
        ".process-card, " +
        ".app-download-card, " +
        "#mission-container, " +
        "#purpose-container, " +
        "#target-users-container, " +
        ".contact-item, " +
        "#concern-form, " +
        "#track-ticket-form"
    );


const revealObserver =
    new IntersectionObserver(
        function(entries, observer) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal", "show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(function(element) {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   NAVBAR SCROLL EFFECT
   ========================================================= */

const header =
    document.getElementById("header");


window.addEventListener("scroll", function() {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   ACTIVE NAVBAR SECTION
   ========================================================= */

const sections =
    document.querySelectorAll("main section");


const navLinks =
    document.querySelectorAll(
        "#navigation-container a"
    );


const sectionObserver =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    const sectionId =
                        entry.target.getAttribute("id");


                    navLinks.forEach(function(link) {

                        link.classList.remove("active");

                    });


                    const activeLink =
                        document.querySelector(
                            '#navigation-container a[href="#' +
                            sectionId +
                            '"]'
                        );


                    if (activeLink) {

                        activeLink.classList.add("active");

                    }

                }

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(function(section) {

    sectionObserver.observe(section);

});


/* =========================================================
   HOW IT WORKS
   CLICKABLE IMAGE ANIMATION
   ========================================================= */

const workflows = [

    {
        image: "images/submit-concern.png",

        title: "Submit Your Concern",

        description:
            "Students can submit their concern by filling out the online concern form."
    },

    {
        image: "images/review.png",

        title: "Concern Review",

        description:
            "The submitted concern is reviewed and assigned to the appropriate personnel."
    },

    {
        image: "images/track-ticket.png",

        title: "Track Your Ticket",

        description:
            "Students can use their ticket number to check the current status of their concern."
    },

    {
        image: "images/resolved.png",

        title: "Concern Resolved",

        description:
            "Once the concern has been handled, the ticket is updated and marked as resolved."
    }

];


function showWorkflow(index) {

    const image =
        document.getElementById(
            "workflow-image"
        );


    const title =
        document.querySelector(
            "#workflow-description h3"
        );


    const description =
        document.querySelector(
            "#workflow-description p"
        );


    const buttons =
        document.querySelectorAll(
            ".workflow-tab"
        );


    /* Start image animation */

    image.classList.add(
        "workflow-changing"
    );


    setTimeout(function() {

        /* Change image */

        image.src =
            workflows[index].image;

        image.alt =
            workflows[index].title;


        /* Finish image animation */

        image.classList.remove(
            "workflow-changing"
        );


    }, 250);


    /* Change title */

    title.textContent =
        workflows[index].title;


    /* Change description */

    description.textContent =
        workflows[index].description;


    /* Update active tab */

    buttons.forEach(function(button) {

        button.classList.remove(
            "active"
        );

    });


    buttons[index].classList.add(
        "active"
    );

}