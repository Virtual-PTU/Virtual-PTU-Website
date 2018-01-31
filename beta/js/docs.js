(async function() {
    const updateInfo = {
        versions: (await firebase.database().ref("/Software/Update_Info/Versions").once("value")).val(),
        latestVersion: (await firebase.database().ref("/Software/Update_Info/Latest_Version").once("value")).val(),
        latestVersionAlpha: (await firebase.database().ref("/Software/Update_Info/Latest_Version_Alpha").once("value")).val(),
        latestVersionBeta: (await firebase.database().ref("/Software/Update_Info/Latest_Version_Beta").once("value")).val(),
        latestVersionMaster: (await firebase.database().ref("/Software/Update_Info/Latest_Version_Master").once("value")).val(),
        oldestVersionAllowed: (await firebase.database().ref("/Software/Update_Info/Oldest_Version_Allowed").once("value")).val()
    };
    const $currentDoc = document.querySelector(".current-doc");
    const $title = document.querySelector("title");

    let selectedVersion = updateInfo.latestVersion;

    // Add versions to list
    const $versionList = document.getElementById("select-version");
    updateInfo.versions.reverse();
    updateInfo.versions.forEach(version => {
        let $el = document.createElement("option");
        $el.value = version.Build_ID;
        $el.textContent = version.Version_Name;

        if (version.Build_ID === updateInfo.oldestVersionAllowed - 1) {
            let $dotDotDot = document.createElement("option");
            $dotDotDot.disabled = true;
            $dotDotDot.innerHTML = "<strong>--- BELOW ARE DEPRECATED ---</strong>";
            $versionList.appendChild($dotDotDot);
        }

        //if (version.Build_ID === updateInfo.latestVersion) $el.selected = true;

        $versionList.appendChild($el);
    });
    updateInfo.versions.reverse();
    $versionList.addEventListener("change", () => {
        selectedVersion = parseInt($versionList.value);
        loadVersionWithDeprecatedMessage(selectedVersion);
    });

    async function loadVersionWithDeprecatedMessage(version) {
        await loadFromVersion(selectedVersion, location.hash.substr(1));

        if (version < updateInfo.oldestVersionAllowed) {
            let $warning = document.createElement("h1");
            $warning.className = "danger-text";
            $warning.innerHTML = "<em>Warning</em>: This version is no longer supported!";

            $currentDoc.insertBefore($warning, $currentDoc.firstChild);
        }
    }

    let versionOptions = Array.from(document.querySelectorAll("[name=version-option]"));
    versionOptions.forEach($el => {
        $el.addEventListener("change", async () => {
            if ($el.checked && $el.id !== "choose-version") {
                $versionList.disabled = true;
                switch ($el.id) {
                    case "dev-latest":
                        selectedVersion = "Dev";
                        break;
                    case "alpha-latest":
                        selectedVersion = "Alpha";
                        break;
                    case "beta-latest":
                        selectedVersion = "Beta";
                        break;
                    case "master-latest":
                        selectedVersion = "Master";
                        break;
                }
                await loadFromVersion(selectedVersion, location.hash.substr(1), true);
            } else {
                await loadVersionWithDeprecatedMessage(parseInt($versionList.value));
                $versionList.disabled = null;
            }
        });
    });

    function replaceYoutube(tree, parent) {
        let sectionName = tree[0];

        if (sectionName === "link") {
            let youtubeComIndex = tree[1].href.indexOf("youtube.com/watch?v=");
            let youtuBeIndex = tree[1].href.indexOf("youtu.be/");
            let isYoutubeCom;
            if ((youtubeComIndex === 7 || youtubeComIndex === 8 || youtubeComIndex === 11 || youtubeComIndex === 12 && (isYoutubeCom = true)) ||
                (youtuBeIndex === 7 || youtuBeIndex === 8 || youtuBeIndex === 11 || youtuBeIndex === 12)) {
                let videoId = tree[1].href.substr(isYoutubeCom ? youtubeComIndex + "youtube.com/watch?v=".length : "youtu.be/".length);

                if (parent[0] === "header") {
                    tree[1] = {
                        href: "#",
                        onclick: `openDialog("https://youtube.com/embed/${videoId}")`
                    };
                    tree[2] = [
                        "small",
                        {},
                        "(video explanation)"
                    ];
                    return;
                }

                tree[0] = "iframe";
                tree[1] = {
                    src: "https://youtube.com/embed/" + videoId,
                    frameborder: "0",
                    allow: "autoplay; encrypted-media",
                    allowfullscreen: "true",
                    width: "640",
                    height: "360"
                };
                tree[2] += " (If this text displays, your browser doesn't support iFrames. WOW.";
            }

            return;
        }

        if (!(tree instanceof Array)) return;

        tree.slice(1).forEach(el => replaceYoutube(el, tree));
    }

    async function loadFromVersion(version, fileName, isBranchName = false) {
        let versionData = isBranchName ? {Commit_ID: version} : updateInfo.versions[parseInt(version)];

        let dotCount = 2, dotState = false;
        let interval = setInterval(() => {
            if (dotState) {
                dotCount--;
                if (dotCount <= 1) {
                    dotState = false;
                }
            } else {
                dotCount++;
                if (dotCount >= 3) {
                    dotState = true;
                }
            }

            $currentDoc.innerHTML = `<p>Please wait, the page is loading${".".repeat(dotCount)}</p>`;
        }, 250);

        // make file name neater
        fileName = "/" + fileName + "/";
        fileName = fileName.replace(/[\\\/]+/g, "/");
        fileName = fileName.substr(1, fileName.length - 2);
        if (fileName.substr(-".md".length) !== ".md") fileName += ".md";

        let title = fileName.split(/[-_ ]/g).map(el => el.substr(0, 1).toUpperCase() + el.substr(1)).join(" ").replace(/\.md$/, "");

        // load file from Github
        let response;
        try {
            response = await Promise.resolve($.get(`https://rawgit.com/Virtual-PTU/Virtual-Pokemon-Tabletop/${versionData.Commit_ID}/docs/${fileName}`));
        } catch (e) {
            response = `# 404 Page Not Found
#### oh whatever you know what \`404\` means...

**We don't have docs for ${title} (yet).**

So, either:

 - you typed in random text or something completely unrelated (we know who you are)
 - you clicked a link that was wrong
 - you were actually looking for some docs about VPTU (good job)
 
If it was the first, good job. You successfully didn't break the website.

If it was the second one, go tell that person to fix up the link.

If it was the last one, why were you typing it into the URL? Use the selector to the right!`;
        }

        let parsed = markdown.parse(response);
        replaceYoutube(parsed);

        clearInterval(interval);
        $currentDoc.innerHTML = markdown.renderJsonML(markdown.toHTMLTree(parsed));

        $title.textContent = title + " | Virtual PTU";
    }

    if (window.location.hash.length <= 1) window.location.hash = "/index";
    await loadFromVersion(selectedVersion, window.location.hash.substr(1));
    document.body.removeAttribute("class");

    window.addEventListener("hashchange", async () => {
        if (window.location.hash.length <= 1) window.location.hash = "/index";
        await loadFromVersion(selectedVersion, window.location.hash.substr(1));
    });
}());

function openDialog(url) {
    let $background = document.createElement("section");
    $background.style.position = "fixed";
    $background.style.top = "0";
    $background.style.left = "0";
    $background.style.right = "0";
    $background.style.bottom = "0";
    $background.style.background = "#00000044";
    $background.style.zIndex = "999999";
    $background.style.cursor = "pointer";

    let $frame = document.createElement("iframe");
    $frame.src = url;
    $frame.allow = "autoplay; encrypted-media";
    $frame.width = "640";
    $frame.height = "360";
    $frame.style.position = "fixed";
    $frame.style.top = "50%";
    $frame.style.left = "50%";
    $frame.style.transform = "translate(-50%, -50%)";
    $frame.style.zIndex = "1000000";

    $background.onclick = () => {
        $background.remove();
        $frame.remove();
    };

    document.body.appendChild($background);
    document.body.appendChild($frame);
}
