const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let url
if (process.env.NODE_ENV === 'DEV') {
    url = 'http://localhost:8080/'
} else {
    url = `file://${process.cwd()}/dist/index.html`
}


app.on('ready', () => {
    let window = new BrowserWindow({
        width: 2000,
        height: 2000,
        icon: __dirname + '/src/assets/logo.png',
        autoHideMenuBar: true
    })
    window.loadURL(url)
})

