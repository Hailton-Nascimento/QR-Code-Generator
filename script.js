const $wrapper = document.querySelector(".wrapper");
const $input = $wrapper.querySelector(".form input");
const $generateBtn = $wrapper.querySelector(".form button");
const $qrImg = $wrapper.querySelector(".qr-code img");


const checkedUrl = urlInput => {
    const expression =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const regex = new RegExp(expression);
    urlInput = urlInput.trim();
    return regex.test(urlInput);
}
const getQRCodeInsertToDOM = urlInput => {
    $generateBtn.innerText = "Generating QR Code...";
    const urlAPI = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${urlInput}`
    $qrImg.src = urlAPI;
    $qrImg.addEventListener("load", () => {
        $wrapper.classList.add("active");
        $generateBtn.innerText = "Generate QR Code";
    });
}
const generateQRCode = () => {
    const urlInput = $input.value.trim();
    const isUrl = checkedUrl(urlInput);

    if (!isUrl) {
        alert("texto digitador não tem o padrão de uma URL.")
        return;
    }
    getQRCodeInsertToDOM(urlInput);
}


$generateBtn.addEventListener("click", generateQRCode);

$input.addEventListener("keyup", () => {
    if (!$input.value.trim()) {
        $wrapper.classList.remove("active");
    }
});