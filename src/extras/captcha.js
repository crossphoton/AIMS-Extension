function fillCaptcha() {
    const CAPTCHA = document
        .getElementById("appCaptchaLoginImg")
        .src.split("/");

    document.getElementById("captcha").value = CAPTCHA[CAPTCHA.length - 1];
}

fillCaptcha();

console.log("this is from external source");

document.getElementById("loginCapchaRefresh").addEventListener("click", (e) => {
    console.log("kuabefka");
    setTimeout(fillCaptcha, 1000);
});
