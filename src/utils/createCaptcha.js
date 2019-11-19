export default function(num = 6, letters = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890') {
    let tpl = ''
    let captcha = []

    try {
        captcha = [...Array(num)].map(() => letters[Math.floor(Math.random() * letters.length)])
    // eslint-disable-next-line no-empty
    } catch (e) {}

    captcha.forEach(item => {
        tpl += `<span class="flex1 hcenter">${item}</span>`
    })

    captcha = captcha.join('')

    return {
        tpl,
        captcha
    }
}