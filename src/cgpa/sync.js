function syncWithRemoteServer(e){

    if(!REMOTE_SERVER_URL || REMOTE_SERVER_URL == ""){
        chrome.notifications.create("RemoteUnavailable",
            new NotificationsConfig("Remote Server not Avaiable", "Click for support."));
        return;
    }

    fetch(ACAD_DATA_URL).then(res => res.json())
        .then(fetchedData =>{
            fetch(REMOTE_SERVER_URL, {
                method: "PATCH",
                body: fetchedData
            });
        });

}

