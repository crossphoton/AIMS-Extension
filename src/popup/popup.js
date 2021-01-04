$(function(){
    chrome.tabs.create({url: chrome.runtime.getURL("/src/main/main.html")})
    close();
});