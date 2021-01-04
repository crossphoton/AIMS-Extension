function calculate(e){

    fetch(USER_URL)
    .then(res => {
        if(res.redirected) {
            chrome.notifications.create("NotLoggedIn",
                new NotificationsConfig("We can't get the data.", "Looks like you're not logged in. Click to login"));
            return null;
        }
        return res.json();
    }).then(data => {
        if(data == null) return;
        
        userRollNumber = String(data[0].desc).split("-")[0];
        userName = String(data[0].desc).split("-")[1];

        USER = {userName, userRollNumber};
        
        showCGPA();

    }).catch(error => {
        chrome.notifications.create("Error",
            new NotificationsConfig("Error!!", "Looks like there's a connection issue."));
    })
}

$(function(){
    $("#get-cgpa").click(calculate);
    $("#sync-cgpa").click(syncWithRemoteServer);
    $(".print-page").click(() => window.print());

    chrome.notifications.onClicked.addListener((notificationId)=>{

        if(notificationId == "NotLoggedIn")
            chrome.tabs.create({url: BASE_URL})

        if(notificationId == "RemoteUnavailable")
            chrome.tabs.create({url: "mailto:" + DEV_EMAIL});
    })
});