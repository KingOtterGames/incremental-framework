import Save from 'framework/Save'

const importSave = (slot) => {
    const fileSelector = document.getElementById('fileid')

    fileSelector.addEventListener('change', (event) => {
        const fileList = event.target.files
        let file = fileList[0]

        const readerHandler = (event) => {
            const result = event.target.result
            Save.save(JSON.parse(Save.decode(result)), slot)
            reader.removeEventListener('load', readerHandler)
            window.location.reload()
        }

        // Read file
        const reader = new FileReader()
        reader.addEventListener('load', readerHandler)
        reader.readAsText(file)
    })

    // Trigger the file import dialogue
    document.getElementById('fileid').click()
}

const exportSave = (slot) => {
    let date = new Date()
    const filename = process.env.REACT_APP_NAME + '-' + date.toISOString() + '.json'
    const jsonStr = localStorage.getItem('save-' + slot)

    let element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-16,' + encodeURIComponent(jsonStr))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}

const SaveManager = {
    importSave,
    exportSave,
}

export default SaveManager
