const { ipcRenderer, contextBridge } = require('electron')
contextBridge.exposeInMainWorld('electronAPI', {
    link: (link) => {
        let event = ipcRenderer.send('link', link)
        return () => event.removeListener('link')
    },
    toggle_fullscreen: () => {
        let event = ipcRenderer.send('toggle_fullscreen')
        return () => event.removeListener('toggle_fullscreen')
    },
    quit: () => {
        let event = ipcRenderer.send('quit')
        return () => event.removeListener('quit')
    },
})
