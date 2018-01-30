/**
 * Copyright (c) 2018, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

(function() {
	Array.from(document.querySelectorAll(".copyright-year")).forEach(el => el.textContent = new Date().getFullYear());
}());