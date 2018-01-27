/**
 * Copyright (c) 2018, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

(function() {
    const $nav = $("nav"),
        $window = $(window);

    $window.on("scroll", e => {
        if ($window.scrollTop() > 25) {
            $nav.addClass("scrolled");
        } else {
            $nav.removeClass("scrolled");
        }
    });

    document.querySelector("#title").addEventListener("click", titleClick);
}());