/**
 * Imports
 */
const electron = require('electron')
const isDev = require('electron-is-dev')
const steamworks = require('steamworks.js')
const path = require('path')

/**
 * Global Variables
 */
let steamClient
const { app, BrowserWindow, globalShortcut, ipcMain } = electron

/**
 * Utilize for Watching Memory Heap
 */
const watchMemory = false

/**
 * Pre-onReady App Setup
 */
app.commandLine.appendSwitch('in-process-gpu')
app.commandLine.appendSwitch('disable-direct-composition')
app.commandLine.appendSwitch('disable-renderer-backgrounding')
app.commandLine.appendSwitch('disable-audio-output')
app.commandLine.appendSwitch('disable-background-timer-throttling')
app.commandLine.appendSwitch('disable-accelerated-2d-canvas')
app.commandLine.appendSwitch('disable-gpu-compositing')
app.commandLine.appendSwitch('disable-gpu')

/**
 * Steam Initialization
 * APP IDs List
 * - Space Wars: 480
 */
const initSteamworks = () => {
    try {
        steamClient = steamworks.init(480)

        // Trigger Achievments
        ipcMain.on('trigger_achievement', (event, achievement_name) => {
            steamClient.achievement.activate(achievement_name)
        })

        // Check Achievment
        ipcMain.on('check_achievement', (event, achievement_name) => {
            event.returnValue = steamClient.achievement.isActivated(achievement_name)
        })
    } catch (err) {
        throw err
    }
}

const getSteamId = () => {
    if (!steamClient) return null
    return steamClient.localplayer.getSteamId().steamId64
}

const getSteamName = () => {
    if (!steamClient) return null
    return steamClient.localplayer.getName()
}

/**
 * Create Browser Window
 */
const createWindow = () => {
    let mainWindow = new BrowserWindow({
        width: 1250,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'electron-preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
            backgroundThrottling: false,
            pageVisibility: true,
        },
        autoHideMenuBar: true,
        center: true,
        show: false,
        icon: path.join(__dirname, 'favicon.ico'),
    })

    if (!isDev) {
        mainWindow.removeMenu()
    }
    mainWindow.maximize()
    mainWindow.show()

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' })
    }

    mainWindow.webContents.on('render-process-gone', function (event, detailed) {
        console.log('========================== SOMETHING WENT TERRIBLY WRONG ==========================')
        console.log(event)
        console.log(detailed)
        console.log('========================== SOMETHING WENT TERRIBLY WRONG ==========================')

        // Uncomment out the next line for a "fix" that refreshes the render process if it crashes
        // mainWindow.webContents.reload()
    })

    mainWindow.on('closed', () => {
        mainWindow = null
        app.quit()
        return
    })

    return mainWindow
}

/**
 * When Ready
 */
app.whenReady().then(() => {
    // Initialize Steam
    initSteamworks()

    // Build the Window
    const mainWindow = createWindow()

    // Verify Steamworks Connection
    console.log('Initialized Steamworks under the Steam Account: ' + getSteamName() + ' (' + getSteamId() + ')')

    // Quit App Event
    ipcMain.on('close-me', function () {
        app.quit()
    })

    // Toggle Full Screen
    ipcMain.on('toggle_fullscreen', function () {
        if (mainWindow.isFullScreen()) {
            mainWindow.setFullScreen(false)
        } else {
            mainWindow.setFullScreen(true)
        }
    })

    // Force Close when Closed
    app.on('window-all-closed', function () {
        app.quit()
    })

    // Safe Exit
    process.on('exit', () => {
        app.quit()
        return
    })
})

/**
 * Disables for Production
 */
if (!isDev) {
    app.on('browser-window-focus', function () {
        globalShortcut.register('CommandOrControl+R', () => {
            console.log('CommandOrControl+R is pressed: Shortcut Disabled')
        })
        globalShortcut.register('F5', () => {
            console.log('F5 is pressed: Shortcut Disabled')
        })
        globalShortcut.register('Control+Shift+I', () => {
            console.log('Control Shift I is disabled!')
        })
    })

    app.on('browser-window-blur', function () {
        globalShortcut.unregister('CommandOrControl+R')
        globalShortcut.unregister('F5')
        globalShortcut.unregister('Control+Shift+I')
    })
}

/**
 * Catch ALL Errors
 */
app.on('uncaughtException', function (err) {
    console.log(err)
})

app.on('unhandledRejection', function (err) {
    console.log(err)
})

process.on('uncaughtException', function (err) {
    console.log(err)
})

process.on('unhandledRejection', function (err) {
    console.log(err)
})

/**
 * Heap Logging
 */
if (isDev && watchMemory) {
    function logBytes(x) {
        console.log(x[0], x[1] / (1000.0 * 1000), 'MB')
    }

    function getMemory() {
        console.log('---')
        console.log('MEMORY')
        Object.entries(process.memoryUsage()).map(logBytes)
    }

    setInterval(getMemory, 1000)
}

/**
 * Enable Single Instance of Game
 */
let isSingleInstance = app.requestSingleInstanceLock()
if (!isSingleInstance) {
    app.quit()
}
