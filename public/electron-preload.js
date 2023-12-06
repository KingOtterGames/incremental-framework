const { ipcRenderer, contextBridge } = require('electron')
contextBridge.exposeInMainWorld('electronAPI', {
    discord: () => {
        let event = ipcRenderer.send('discord')
        return () => event.removeListener('discord')
    },
    youtube: () => {
        let event = ipcRenderer.send('youtube')
        return () => event.removeListener('youtube')
    },
    quit: () => {
        let event = ipcRenderer.send('quit')
        return () => event.removeListener('quit')
    },
})
