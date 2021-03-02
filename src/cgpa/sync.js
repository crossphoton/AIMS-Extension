function syncWithRemoteServer(e) {
    if (!USER || !AIMSData) {
        alert('Click on "Get CGPA" first');
        return;
    }
    if (!REMOTE_SERVER_URL || REMOTE_SERVER_URL == "") {
        chrome.notifications.create(
            "RemoteUnavailable",
            new NotificationsConfig(
                "Remote Server not Available",
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
    })
        .then((res) => {
            if (res.ok) {
                alert(
                    "Sync Successful!! Enjoy the seamless environment (at least in future)."
                );
            } else syncError();
        })
        .catch((err) => syncError(err));
}

function syncError(err) {
    $(function () {
        $("#dialog").dialog();
    });
}
