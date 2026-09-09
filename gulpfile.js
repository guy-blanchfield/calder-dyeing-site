// what do we want?

// - all css concatenated into one file and minified / uglified
// - css autoprefixed
// everything in /css/*.css not /css/old

// - scripts minified / uglified / drop console (decodeEmail, google-map, loadPicture, navbar-toggler, prevent-maps-font-download)

// - html minified, comments removed (index, contact, privacy, services, sustainability)

// what do we need?

// gulp-uglify, gulp-concat, gulp-css, gulp-terser? gulp-html-minifier-terser, gulp-sourcemaps?

// do we need a src folder and a build folder, just a build folder? try just the build folder see how it goes

// declare vars

const { src, dest, watch, series } = require("gulp");

const concat = require("gulp-concat");
const cssMin = require("gulp-css");
const terser = require("gulp-terser");
const htmlmin = require("gulp-html-minifier-terser");
// const sourcemaps = require("gulp-sourcemaps");

// JS Task
function minifyJS() {
	// we don't need to do all the files in js, but it's easier
	// than manually specifying files
	return src("js/*.js")
		.pipe(
			terser({
				// option to remove console.logs
				compress: {
					drop_console: true,
				},
			}),
		)
		.pipe(dest("dist/js"));
}

// HTML Task
function minifyHTML() {
	// return src(["*.html", "!dist/"])
	return src(["index.html", "contact/*.html", "privacy/*.html"])
		.pipe(htmlmin({ removeComments: true }))
		.pipe(dest("dist"));
}

// function defaultTask(cb) {
// 	// default task code here
// 	cb();
// }

exports.default = series(minifyJS, minifyHTML);
