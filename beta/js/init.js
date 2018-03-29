function loadScript(src, crossOrigin) {
    let $el = document.createElement("script");
    $el.src = src;
    $el.crossOrigin = crossOrigin;

    console.log("Loading", src);
    return new Promise(yay => {
        $el.onload = () => {
            yay();
            $el.remove();
        };
        document.body.appendChild($el);
    });
}

window.onScriptLoadComplete = ()=>{};
(async function() {
    let startTime = performance.now();
    
    // Load scripts
    await loadScript("https://cdn.ravenjs.com/3.22.1/raven.min.js", "anonymous");
    Raven.config("https://76743b4ab265477f8ffae353cfe192a7@sentry.io/278771").install();

    Raven.context(async function() {
        if (location.host.split(":")[0] === "localhost") {
            console.log("Connecting to LiveReload");
            await loadScript("http://localhost:35729/livereload.js?snipver=1")
        }

        await loadScript("/js/attr-data-folder.js");
        await loadScript("/js/nav.js");
        await loadScript("/js/footer.js");

        await loadScript("https://www.gstatic.com/firebasejs/4.9.0/firebase.js");
        await loadScript("/js/auth.js");
        await loadScript("/js/global-announcements.js");

        console.log("Completed loading global scripts after", performance.now() - startTime, "milliseconds");
        typeof onScriptLoadComplete === "function" && onScriptLoadComplete();
    });
}());
