
/* =========================================================
   TOP LODGE
   Vanilla JavaScript
   ========================================================= */


/* =========================
   ELEMENTS
   ========================= */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const header = document.querySelector(".header");

const navLinks = document.querySelectorAll(".nav a");

const sections = document.querySelectorAll("main section[id]");

const images = document.querySelectorAll("img");


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function openMenu() {
    nav.classList.add("active");

    menuToggle.setAttribute("aria-label", "Close navigation");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.textContent = "✕";
}


function closeMenu() {
    nav.classList.remove("active");

    menuToggle.setAttribute("aria-label", "Open navigation");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.textContent = "☰";
}


function toggleMenu() {

    if (nav.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }

}


/* Hamburger button */

if (menuToggle) {

    menuToggle.addEventListener("click", toggleMenu);

}


/* =========================================================
   CLOSE MENU WHEN LINK IS CLICKED
   ========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener("click", event => {

    const clickedInsideNav = nav.contains(event.target);

    const clickedMenuButton = menuToggle.contains(event.target);

    if (
        nav.classList.contains("active") &&
        !clickedInsideNav &&
        !clickedMenuButton
    ) {

        closeMenu();

    }

});


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeMenu();

    }

});


/* =========================================================
   RESET MOBILE MENU ON RESIZE
   ========================================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        closeMenu();

    }

});


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

function handleHeaderScroll() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

function updateActiveLink() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + header.offsetHeight + 120;


    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href").substring(1);

        if (linkTarget === currentSection) {

            link.classList.add("active");

        }

    });

}


window.addEventListener("scroll", updateActiveLink);

window.addEventListener("load", updateActiveLink);


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (!targetId.startsWith("#")) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            header.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

images.forEach(image => {

    image.addEventListener("error", () => {

        image.style.backgroundColor = "#e9dfd0";

        image.style.minHeight = "200px";

        image.style.objectFit = "cover";

        image.alt = "Top Lodge image";

    });

});


/* =========================================================
   PREVENT BROKEN WHATSAPP LINKS
   ========================================================= */

const whatsappLinks =
    document.querySelectorAll('a[href*="wa.me"]');


whatsappLinks.forEach(link => {

    link.addEventListener("click", event => {

        const href = link.getAttribute("href");

        if (
            href.includes("https://wa.me/265883637944") ||
            href.includes("https://wa.me/265883637944")
        ) {

            event.preventDefault();

            alert(
                "WhatsApp booking will be available once the lodge's phone number is added."
            );

        }

    });

});


/* =========================================================
   PAGE LOAD
   ========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

