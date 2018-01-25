firebase.database().ref('/WebData/Announcements').once('value').then(function (snapshot) {
    console.log(snapshot.val());
    snapshot.val().forEach(Display_Global_Announcement)
});

function Display_Global_Announcement(item, index) {
    if (item.Visible == true) {
        Display_Announcement(item.Message, item.Type, false)
    }
}