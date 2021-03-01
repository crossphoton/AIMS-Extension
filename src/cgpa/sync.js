function syncWithRemoteServer(e) {
    if (!USER || !AIMSData) {
        alert('Click on "Get CGPA" first');
        return;
    }
    if (!REMOTE_SERVER_URL || REMOTE_SERVER_URL == "") {
        chrome.notifications.create(
            "RemoteUnavailable",
            new NotificationsConfig(
                "Remote Server not Avaiable",
                "Click for support."
            )
        );
        return;
    }

    fetch(REMOTE_SERVER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: String(USER.userRollNumber).toLowerCase() + "@" + DOMAIN,
            data: AIMSData,
        }),
    });
}
