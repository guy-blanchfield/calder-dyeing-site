// what do we want?

// - all css concatenated into one file and minified / uglified
// - css autoprefixed
// everything in /css/*.css not /css/old

// - scripts minified / uglified / drop console (decodeEmail, google-map, loadPicture, navbar-toggler, prevent-maps-font-download)

// - html minified, comments removed (index, contact, privacy, services, sustainability)

// what do we need?

// gulp-uglify, gulp-concat, gulp-css, gulp-terser? gulp-html-minifier-terser, gulp-sourcemaps?

// do we need a src folder and a build folder - yes. To get this to work we need to add the following to settings.json
// "liveServer.settings.root": "/src",
// NB!!!! This will apply to ALL projects though. Maybe think about using browsersync for projects like this

// declare vars

const { src, dest, watch, series } = require("gulp");

const concat = require("gulp-concat");
const cssmin = require("gulp-css");
const terser = require("gulp-terser");
const htmlmin = require("gulp-html-minifier-terser");
// const sourcemaps = require("gulp-sourcemaps");

// JS Task
function minifyJS() {
	// we don't need to do all the files in js, but it's easier
	// than manually specifying files
	return src("src/js/*.js")
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

// CSS Task
// we actually want to concatenate all the css, then minify it
function minifyCSS() {
	return src("src/css/*.css").pipe(cssmin()).pipe(dest("dist/css"));
}

// HTML Task
function minifyHTML() {
	return src("src/**/*.html")
		.pipe(htmlmin({ removeComments: true }))
		.pipe(dest("dist"));
}

// function defaultTask(cb) {
// 	// default task code here
// 	cb();
// }

exports.default = series(minifyJS, minifyCSS, minifyHTML);
