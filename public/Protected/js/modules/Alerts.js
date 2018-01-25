function Display_Announcement(Message, Type, Closable) {
    //<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>

    if (Closable) {
        if (Type == "Info") {
            document.getElementById('Alerts_Section').innerHTML += '' +
                '<div style="margin-bottom: 0px;" class="alert alert-info alert-dismissable" role="alert">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                '<p>' + Message + '</p>' +
                '</div>';
        } else if (Type == "Warning") {
            document.getElementById('Alerts_Section').innerHTML += '' +
                '<div style="margin-bottom: 0px;" class="alert alert-warning alert-dismissable" role="alert">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                '<p>' + Message + '</p>' +
                '</div>';
        } else if (Type == "Danger") {
            document.getElementById('Alerts_Section').innerHTML += '' +
                '<div style="margin-bottom: 0px;" class="alert alert-danger alert-dismissable" role="alert">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                '<p>' + Message + '</p>' +
                '</div>';
        } else if (Type == "Success") {
            document.getElementById('Alerts_Section').innerHTML += '' +
                '<div style="margin-bottom: 0px;" class="alert alert-success alert-dismissable" role="alert">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                '<p>' + Message + '</p>' +
                '</div>';
        }
    }
    else {
        if (Type == "Info") {
            document.getElementById('Alerts_Section').innerHTML += '' +
                '<div style="margin-bottom: 0px;" class="alert alert-info" role="alert">' +
                '<p>' + Message + '</p>' +
                '</div>';
        } else if (Type == "Warning") {
            document.getElementById('Alerts_Section').innerHTML += '' +
                '<div style="margin-bottom: 0px;" class="alert alert-warning" role="alert">' +
                '<p>' + Message + '</p>' +
                '</div>';
        } else if (Type == "Danger") {
            document.getElementById('Alerts_Section').innerHTML += '' +
                '<div style="margin-bottom: 0px;" class="alert alert-danger" role="alert">' +
                '<p>' + Message + '</p>' +
                '</div>';
        } else if (Type == "Success") {
            document.getElementById('Alerts_Section').innerHTML += '' +
                '<div style="margin-bottom: 0px;" class="alert alert-success" role="alert">' +
                '<p>' + Message + '</p>' +
                '</div>';
        }
    }
}