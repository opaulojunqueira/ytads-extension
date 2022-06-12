chrome.storage.local.get(['time'], function (data) {
    if (data.time != null) {
        setInterval(() => {
            let btnAd = document.querySelector('#insert-ad-button')
            btnAd.click()
            console.log('A')
        }, data.time)
    }
});