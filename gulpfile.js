// what do we want?

// - all css concatenated into one file and minified / uglified
// - css autoprefixed
// everything in /css/*.css not /css/old

// - scripts minified / uglified / drop console (decodeEmail, google-map, loadPicture, navbar-toggler, prevent-maps-font-download)

// - html minified, comments removed (index, contact, privacy, services, sustainability)

// what do we need?

// gulp-uglify, gulp-concat, gulp-css, gulp-terser, gulp-html-minifier-terser, gulp-sourcemaps?

// NB! If we're only using autoprefixer, then gulp-autoprefixer will do
// but if we want any other PostCSS tools then use gulp-postcss with autoprefixer etc as plugins.

// We need a src folder and a dist folder. To get this to work we need to use browsersync instead of liveserver

// -------------------------------------------------------------------------------------------------------------

// Declare vars

const browsersync = require("browser-sync").create();
const { src, dest, watch, series } = require("gulp");

const concat = require("gulp-concat");
const cssmin = require("gulp-css");
const terser = require("gulp-terser");
const htmlmin = require("gulp-html-minifier-terser");
// NB! we need the .default on the autoprefixer require otherwise it errors
// see https://stackoverflow.com/questions/79659584/autoprefixer-is-not-a-function
const prefix = require("gulp-autoprefixer").default;
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

// we need to get the css files in the right order so let's have an array of the files instead of a glob
// look into postcss to do this better
const cssfiles = [
	"src/css/reset.css",
	"src/css/global.css",
	"src/css/header.css",
	"src/css/hero.css",
	"src/css/main.css",
	"src/css/home.css",
	"src/css/footer.css",
	"src/css/googlemap.css",
];

// concatenate, minify and autoprefix the css
function processCSS() {
	// prefix() should use the browserslist specified in package.json
	return src(cssfiles).pipe(concat("styles.css")).pipe(cssmin()).pipe(prefix()).pipe(dest("dist/css"));
}

// HTML Task
function minifyHTML() {
	return src("src/**/*.html")
		.pipe(htmlmin({ removeComments: true }))
		.pipe(dest("dist"));
}

// Browsersync Tasks
function browsersyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: "dist",
		},
	});

	cb();
}

function browsersyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	// two different functions
	// one for just reloading the browser

	watch("src/**/*.html", browsersyncReload);

	// one for building, then refreshing (not sure we'll need this as distinct from running gulp, but go with it for now)
	watch(["src/css/*.css", "src/js/*.js"], series(minifyJS, browsersyncReload));
}

exports.default = series(minifyJS, processCSS, minifyHTML, browsersyncServe);
