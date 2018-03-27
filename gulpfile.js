/**
 * Copyright (c) 2018, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

const gulp = require("gulp"),
    imagemin = require("gulp-imagemin"),
    uglify = require("gulp-uglify"),
    babel = require("gulp-babel"),
    cleancss = require("gulp-clean-css"),
    del = require("del"),
    htmlmin = require("gulp-htmlmin"),
    fs = require("fs");

// Clean the output directory
gulp.task("clean", function() {
    return del(["build"]);
});

gulp.task("scripts", ["clean"], function() {
    // Mininify all JS and output it
    return gulp.src("beta/js/**/*.js")
        .pipe(babel({presets: ["env"]}))
        .pipe(uglify())
        .pipe(gulp.dest("build/js"));
});

gulp.task("images", ["clean"], function() {
    return gulp.src("beta/img/**/*.png")
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest("build/img"));
});

gulp.task("css", ["clean"], function() {
    return gulp.src("beta/css/**/*.css")
        .pipe(cleancss())
        .pipe(gulp.dest("build/css"));
});

gulp.task("html", ["clean"], function() {
    // Match any HTML files that don't start with an underscore
    return gulp.src("beta/**/[!_]*.html")
        .pipe(htmlmin())
        .pipe(gulp.dest("build"));
});

gulp.task("cname", ["build"], function(cb) {
    fs.copyFile("beta/CNAME", "build/CNAME", cb);
});

/*gulp.task("deploy", ["build", "cname"], function(cb) {
    ghpages.publish("build", {
        message: "Publish website",
        remote: "site",
        branch: "master",
        silent: true, // avoid displaying the Github token
        repo: `https://${process.env.GH_TOKEN}@github.com/Virtual-PTU/virtual-ptu.github.io`
    }, cb);
});*/

gulp.task("build", ["scripts", "images", "css", "html"]);