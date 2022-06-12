let input = document.getElementById('inputTime')
let btnSubmit = document.getElementById('btnSubmit')
let btnDelete = document.getElementById('btnDelete')
let textStatus = document.getElementById('textStatus')

btnSubmit.addEventListener('click', () => {
    let inputValue = input.value

    if (inputValue.length <= 0) {
        alert('❌ Insira um valor válido.')
        input.value = ''
    } else {

        if (inputValue == 0) {
            input.value = ''
        }

        if (isNumber(inputValue) === true) {
            chrome.storage.local.set({ 'time': inputValue })
            alert(`✅ Tempo foi definido para ${msToMin(inputValue)}.`)
            document.location.reload(true);
        } else {
            alert('❌ Insira um valor válido, em números.')
            input.value = ''
        }
    }
});

btnDelete.addEventListener('click', () => {
    chrome.storage.local.remove('time')
    alert(`🗑️ Tempo foi deletado com sucesso.`)
    document.location.reload(true);
});


function main() {
    chrome.storage.local.get(['time'], function (data) {
        if (data.time) {
            let timeValue = data.time
            textStatus.textContent = `⏳: ${msToMin(timeValue)}`
        } else {
            textStatus.textContent = `⏳: Não definido`
        }
    });
}
main()


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function msToMin(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + "m " + (seconds < 10 ? '0' : '') + seconds + 's';
}