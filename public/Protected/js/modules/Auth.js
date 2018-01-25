// Initialize Firebase
var config = {
    apiKey: "AIzaSyCaaDRWfqD11-y1xgQz28ty-ouw4N6FOGA",
    authDomain: "vptu-b790b.firebaseapp.com",
    databaseURL: "https://vptu-b790b.firebaseio.com",
    projectId: "vptu-b790b",
    storageBucket: "vptu-b790b.appspot.com",
    messagingSenderId: "411319664302"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if (user.emailVerified == false) {
            Display_Announcement("<b>Email Verification Error:</b> You need to verify your email before most features will become accessible... View Account for more info... ¯\\_(ツ)_/¯", "Danger", true);
        }

        // Logged in
        document.getElementById('NavBar_Account').innerHTML = '' +
            '<li><a href="#" id="Account_View_Button"><span class="glyphicon glyphicon-user"></span> ' + user.displayName + '</a></li>' +
            '<li><a href="#" id="Account_Logout_Button"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>';

        var Logout_Button = document.getElementById('Account_Logout_Button');
        Logout_Button.onclick = function (event) {
            firebase.auth().signOut();
        };
    } else {
        // Not Logged in
        document.getElementById('NavBar_Account').innerHTML = '' +
            '<li><a href="#" id="Account_Signup_Button"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>' +
            '<li><a href="login.html" id="Account_Login_Button"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>';
    }
});