const electron = require('electron')
let kill = require('tree-kill');
const app = electron.app
const {spawn} = require('child_process');
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
    });

    let jarPath = null;

    if (process.env.NODE_ENV === 'DEV') {
        jarPath = app.getAppPath() + "/app.jar";
    } else {
        jarPath = process.resourcesPath + "/app.jar";
    }

    let javaExternalService = spawn("java", ["-jar", jarPath, "--spring.profiles.active=live"]);

    javaExternalService.stdout.on('data', data => {
        process.stdout.write(data);
        // Here is where the output goes
    });
    javaExternalService.stderr.on('data', data => {
        process.stderr.write(data);
        // Here is where the error output goes
    });
    javaExternalService.on('close', code => {
        process.stdout.write(code);
        // Here you can get the exit code of the script
    });

    setTimeout(function () {
        window.loadURL(url);
    }, 10000)

    window.on('closed', function () {
        process.stdout.write("Stop process " + javaExternalService.pid + "...");
        spawn("kill", ["-9", javaExternalService.pid]);
        process.stdout.write("OK\n")
    })
});

app.on('window-all-closed', () => {
    app.quit()
});

