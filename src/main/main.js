var AIMSData;

function calculate(e) {
    toggleLoading();
    // Check for user
    fetch(config.USER_URL)
        .then((res) => {
            if (res.redirected) {
                chrome.notifications.create(
                    "NotLoggedIn",
                    new NotificationsConfig(
                        "We can't get the data.",
                        "Looks like you're not logged in. Click to login"
                    )
                );
                toggleLoading();
                return null;
            }
            return res.json();
        })
        // If user is logged in
        .then(async (data) => {
            if (data == null) return;

            userRollNumber = String(data[0].desc).split("-")[0];
            userName = String(data[0].desc).split("-")[1];

            USER = { userName, userRollNumber };

            $("#name-container").text(USER.userName);
            $("#roll-number-container").text(USER.userRollNumber);

            await showCGPA();
            $(".data-container").show();
            toggleLoading();
            // $(".app-buttons").hide();
        })
        .catch((error) => {
            chrome.notifications.create(
                "Error",
                new NotificationsConfig(
                    "Error!!",
                    "Looks like there's a connection issue."
                )
            );
            toggleLoading();
        });
}

$(function () {
    $("#get-cgpa").click(calculate);
    $("#sync-cgpa").click(syncWithRemoteServer);
    $(".print-page").click(() => {
        $(".print-page").hide();
        $(".button-container").hide();
        window.print();
    });

    chrome.notifications.onClicked.addListener((notificationId) => {
        if (notificationId == "NotLoggedIn")
            chrome.tabs.create({ url: config.BASE_URL });

        if (notificationId == "RemoteUnavailable")
            chrome.tabs.create({ url: "mailto:" + DEV_EMAIL });
    });
});
