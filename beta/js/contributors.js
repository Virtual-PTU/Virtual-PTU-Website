function initContributors(users) {
    const $credits = document.querySelector(".credits"),
        $template = document.getElementById("credit-template");

    $credits.textContent = "";

    users.unshift({
        username: "You",

        shortDescription: "We couldn't have made this without the help of our donators. So, thankyou! (if you haven't donated pls do)",

        tags: [
            "donator"
        ],
        links: {}
    });

    users.forEach(user => {
        $template.content.querySelector(".username").textContent = `${user.username}` + (user.firstName ? ` (${user.firstName})` : "");

        $template.content.querySelector(".short-description").textContent = user.shortDescription;
        $template.content.querySelector(".tags").innerHTML = user.tags.map(tag => `<span class="tag ${tag}"></span>`).join(" ");

        let linksHtml = "";
        if (user.links.github) linksHtml += `<a href="https://github.com/${user.links.github}" class="link github"></a> `;
        if (user.links.ptForum) linksHtml += `<a href="http://forums.pokemontabletop.com/profile/${user.links.ptForum}" class="link forums"></a> `;
        if (user.links.youtube) linksHtml += `<a href="https://youtube.com/${user.links.youtube}" class="link youtube"></a>`;
        $template.content.querySelector(".links").innerHTML = linksHtml;

        const $clone = document.importNode($template.content, true);
        const $credit = document.createElement("section");
        $credit.className = "credit";
        $credit.appendChild($clone);
        $credits.appendChild($credit);
    });

    $template.remove();
}