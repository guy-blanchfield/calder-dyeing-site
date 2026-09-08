// NB! This is a work in progress
// not currently being used

// we can get the image-set for the element like this

const bgImageElement = document.querySelector(".bg-image");
const bgImageElementStyle = window.getComputedStyle(bgImageElement, false);
const bgImage = bgImageElementStyle.backgroundImage.slice(4, -1).replace(/"/g, "");
console.log(bgImage);

// to actually get the url of the image chosen by the browser
// we'd have to detect webp support and then assume that the browser has chosen the first image in the set

// https://davidwalsh.name/detect-webp shows a jake archibald script that does this

async function supportsWebp() {
	if (!self.createImageBitmap) return false;

	const webpData = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
	const blob = await fetch(webpData).then((r) => r.blob());
	return createImageBitmap(blob).then(
		() => true,
		() => false,
	);
}

(async () => {
	if (await supportsWebp()) {
		console.log("does support");
	} else {
		console.log("does not support");
	}
})();
