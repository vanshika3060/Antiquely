const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function () {
  // this is to add Group 28 licenses in the production mode for the minified js
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Antiquely - v1.1.0 based on Tailwind Starter Kit by Group 28
=========================================================

* Product Page: https://www.creative-tim.com/product/notus-react
* Copyright 2021 Group 28 (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md)

* Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

* Coded by Group 28

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Group 28 licenses in the production mode for the minified html
  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

=========================================================
* Antiquely - v1.1.0 based on Tailwind Starter Kit by Group 28
=========================================================

* Product Page: https://www.creative-tim.com/product/notus-react
* Copyright 2021 Group 28 (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md)

* Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

* Coded by Group 28

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Group 28 licenses in the production mode for the minified css
  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Antiquely - v1.1.0 based on Tailwind Starter Kit by Group 28
=========================================================

* Product Page: https://www.creative-tim.com/product/notus-react
* Copyright 2021 Group 28 (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md)

* Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

* Coded by Group 28

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
