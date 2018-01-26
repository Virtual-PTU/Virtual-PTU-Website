/**
 * Copyright (c) 2018, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

(function() {
    $("a[data-folder]").each(function() {
        const $el = $(this);
        const folder = $el.attr("data-folder");
        $el.removeAttr("data-folder");

        $el.attr("href", folder.replace(/\/+$/, "") + "/" + $el.text());
    });
}());