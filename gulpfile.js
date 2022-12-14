var gulp = require("gulp");
const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const gulpStyleLint = require("gulp-stylelint");

function style() {
  return src("./css/**/*.scss")
    .pipe(
      gulpStyleLint({
        reporters: [{ formatter: "string", console: true }]
      })
    )
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./scss"))
    .pipe(browserSync.stream());
}

function watcher() {
  browserSync.init({ server: { baseDir: "./" } });
  watch("./css/**/*.scss", style);
  watch("./*.html").on("change", browserSync.reload);
  watch("./js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watcher;
