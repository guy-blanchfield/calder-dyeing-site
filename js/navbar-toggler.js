// for the mobile navmenu open/close toggle

console.log("Toggler script running!");

// define vars, get refs
const navbarToggler = document.querySelector(".navbar__toggler");
const toggleTarget = navbarToggler.dataset.bsTarget;
const navMenu = document.querySelector(toggleTarget);

// set navMenu aria-hidden to false if min-width is desktop size
// we could do it the other way round and set aria-hidden to true once we know
// min-width is mobile size but seeing as we're doing mobile first it makes sense
// to set aria-hidden true in the html and set it false once the js runs
// either way if the mobile menu is collapsed then navMenu aria-hidden needs to be true
const queryMinWidthDesktop = window.matchMedia("(min-width: 992px)");

// NB!!! do we need something to check for resize? if navmenu is set to aria-hidden false
// by this media query, what happens if the window is resized to mobile width?
// it remains aria-hidden false until the toggle button is clicked (even though it should be aria-hidden true)
// we don't really but do it anyway
queryMinWidthDesktop.addEventListener("change", handleMinWidthChange);

function handleMinWidthChange(e) {
	if (e.matches || navbarToggler.getAttribute("aria-expanded") === "true") {
		// if minwidth is 992 OR if toggler aria-expanded is true,
		// the nav menu will be showing, so aria-hidden should be false
		navMenu.setAttribute("aria-hidden", "false");
	} else {
		// if min-width is not 992 AND if navbar toggler expanded is false
		// menu will not be showing so aria-hidden should be true
		navMenu.setAttribute("aria-hidden", "true");
	}
}

if (queryMinWidthDesktop.matches) {
	navMenu.setAttribute("aria-hidden", "false");
}

// quick dirty replacement for bootstrap navmenu js

const toggleMobileNavMenu = (e = null) => {
	// console.log(e.target);
	console.log("toggle!");

	navMenu.classList.toggle("show");
	// also toggle aria-expanded and aria-hidden
	if (navbarToggler.getAttribute("aria-expanded") === "false") {
		navbarToggler.setAttribute("aria-expanded", "true");
		navMenu.setAttribute("aria-hidden", "false");
	} else {
		navbarToggler.setAttribute("aria-expanded", "false");
		navMenu.setAttribute("aria-hidden", "true");
	}
};

// clicking #aboutus link from home page stays on same page,
// so we need to manually change the 'about us' nav-link's aria-current value

// we need to do this on hashchange AND also on reload
// so eventlisteners for hashchange and domcontentloaded
// both call the handleURLChange function, which is specifically for this task

// detect hash change
window.addEventListener("hashchange", () => {
	// console.log("hashchange!");
	handleURLChange();
	// we also need to close the mobile nav menu manually
	// so toggle it conditional on the menu already being open

	if (navbarToggler.getAttribute("aria-expanded") === "true") {
		toggleMobileNavMenu();
	}
});
// detect page load
window.addEventListener("DOMContentLoaded", handleURLChange);

function handleURLChange() {
	// console.log("handleURLChange!");
	// check if we're viewing the about us section (probably /#aboutus)
	// if true, set the about us nav-link aria-current attribute to page
	// else set it to false
	const ariaCurrentValue = location.href.includes("aboutus") ? "page" : "false";
	document.querySelector("#nav-link__aboutus").setAttribute("aria-current", ariaCurrentValue);
}

navbarToggler.addEventListener("click", toggleMobileNavMenu);

// navbarToggler.addEventListener("click", () => {
// 	console.log("Toggler clicked!");
// });
