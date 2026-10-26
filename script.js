/* ==================================================
   NEXORA STUDIO — JAVASCRIPT
   ================================================== */

"use strict";

/* Enable progressive enhancement only after JS loads. */
document.documentElement.classList.add("js-enabled");


/* ---------- 1. MOBILE NAVIGATION ---------- */

const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("primary-navigation");
const navigationLinks = navigation
    ? navigation.querySelectorAll("a")
    : [];

function closeMenu() {
    if (!menuToggle || !navigation) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
}

function openMenu() {
    if (!menuToggle || !navigation) return;

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    navigation.classList.add("is-open");
    document.body.classList.add("menu-open");
}

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close the mobile menu after selecting a navigation link.
    navigationLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close the menu when Escape is pressed.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Close the mobile menu if the viewport becomes desktop-sized.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });

    // Close the menu if the user clicks outside the navigation.
    document.addEventListener("click", (event) => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (
            isOpen &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });
}


/* ---------- 2. AUTOMATIC COPYRIGHT YEAR ---------- */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ---------- 3. SCROLL REVEAL ANIMATIONS ---------- */

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {
    // Fallback for older browsers and reduced-motion preferences.
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
}


/* ---------- 4. HANDLE BROWSER HISTORY ---------- */

// Close the mobile navigation if the user returns to the page
// through browser history or navigates to a different hash.
window.addEventListener("pageshow", () => {
    closeMenu();
});