function syncWithRemoteServer(e) {
    if (!USER || !AIMSData) {
        alert('Click on "Get CGPA" first');
        return;
    }
    if (!REMOTE_DATA_SYNC_URL || REMOTE_DATA_SYNC_URL == "") {
        chrome.notifications.create(
            "RemoteUnavailable",
            new NotificationsConfig(
                "Remote Server not Available",
                "Click for support."
            )
        );
        return;
    }

    fetch(REMOTE_DATA_SYNC_URL, {
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
            } else syncError(res);
        })
        .catch((err) => syncError(res));
}

function syncError(response) {
    if (response.status == 401) {
        if (confirm("You are authorized. Click OK to login")) {
            open(REMOTE_LOGIN_URL);
        } else return;
    }

    alert("Some error occured");
}
