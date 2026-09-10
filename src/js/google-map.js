// Initialize and add the map
let map;
console.log("google-map.js running!");

async function initMap() {
	// Calder Dyeing
	// 53.681292897922354, -1.6364816931105417
	// Calder Textiles
	// 53.68053333223048, -1.6378943928851983

	// The location of Calder Dyeing
	const calderdyeing = { lat: 53.681292897922354, lng: -1.6364816931105417 };
	// const calderdyeing = { lat: 53.680525, lng: -1.63789 };

	// Request needed libraries.
	// also access infoWindow here
	const { Map, InfoWindow } = await google.maps.importLibrary("maps");
	// const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
	const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

	// The map, centered at Calder Textiles
	map = new Map(document.getElementById("map"), {
		zoom: 13,
		center: calderdyeing,
		mapId: "CALDER_DYEING",
		// options: {
		// gestureHandling: "greedy",
		// },
		// styling (e.g. night mode) has to be done with the cloud console
		// https://developers.google.com/maps/documentation/cloud-customization/overview#cloud_tooling
	});

	// The difference from the old setup
	// is that a new PinElement is assigned to const content which is then used in an options object when
	// creating a new AdvancedMarkerElement

	// before, the AdvancedMarkerElement was created with just map, draggable, position and title
	// and the content property of the new AdvancedMarkerElement was assigned to const content
	const content = new PinElement();

	// The marker, positioned at Calder Textiles
	const marker = new AdvancedMarkerElement({
		map: map,
		draggable: false,
		// little drop animation on the marker
		// now done with css
		position: calderdyeing,
		title: "Calder Dyeing",
		content,
	});

	content.style.opacity = "0";
	content.addEventListener("animationend", (event) => {
		console.log("animationend!");
		// yeah so this event isn't firing :(
		content.classList.remove("drop");
		content.style.opacity = "1";
	});

	// --delay-time set here, and used in the css
	const delayTime = 1.5;
	content.style.setProperty("--delay-time", delayTime + "s");
	// observe the marker content
	intersectionObserver.observe(content);

	// the infoWindow (opens on clicking the marker)
	//  content for the infoWindow

	const infoWindowContent = `
		<h5>Calder Dyeing Ltd</h5>
		<p>
			Dewsbury Mills<br />
			Thornhill Road<br />
			Dewsbury<br />
			WF12 9QE<br />
			United Kingdom
		</p>
	`;

	//  create the infoWindow
	const infowindow = new InfoWindow({
		content: infoWindowContent,
		// so opening the infoWindow doesn't cause the map to shift
		disableAutoPan: true,
		ariaLabel: "Calder Dyeing Ltd",
	});

	// open the infoWindow on marker's click event
	// NB addListener is a method of google map's event object
	marker.addListener("click", () => {
		infowindow.open({
			anchor: marker,
			map,
		});
	});
}

// now using advancedMarkerElement so animation uses css (in the Astro component) and intersection observer
const intersectionObserver = new IntersectionObserver((entries) => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			console.log("is intersecting");
			// drop class is definitely being added
			// BUT rules from the class '.drop' are NOT being applied to the marker
			// Why not?
			entry.target.classList.add("drop");
			console.log(entry.target);
			intersectionObserver.unobserve(entry.target);
		}
	}
});

initMap();
