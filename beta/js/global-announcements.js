firebase.database().ref("/WebData/Announcements").once("value").then(async snapshot => {
    const $sideBar = document.querySelector(".alerts-sidebar");

    for (const item of snapshot.val()) {
        if (item.Visible) {
            let $displayElem = document.createElement("section");
            $displayElem.className = "alert " + item.Type.toLowerCase();
            $displayElem.innerHTML = item.Message;
            $sideBar.appendChild($displayElem);

            await new Promise(yay=>setTimeout(yay,250));
        }
    }
});