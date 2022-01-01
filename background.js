const BASE_URL = "https://aims.iiitr.ac.in/iiitraichur/";

chrome.webNavigation.onCompleted.addListener(
    (tab) => {
        console.log(tab);
        if (tab.url != BASE_URL) return;

        chrome.tabs.executeScript(tab.tabId, {
            file: "src/extras/captcha.js",
        });
    },
    { url: [{ urlMatches: BASE_URL }] }
);
