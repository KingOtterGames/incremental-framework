import { useEffect } from 'react'

const SteamPlugin = () => {
    useEffect(() => {
        const gameLoop = () => {
            const canvas = document.getElementById('fake-refresh-steam')
            const styler = canvas
            styler.style.width = `100vw`
            styler.style.height = `100vh`
            const ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, 1, 1)
            ctx.fillStyle = 'rgba(0, 0, 0, 0.01)'
            ctx.fillRect(0, 0, 1, 1)
            requestAnimationFrame(gameLoop)
        }

        const canvas = document.createElement('canvas')
        canvas.id = 'fake-refresh-steam'
        canvas.width = 1
        canvas.height = 1
        const styler = canvas
        styler.style.position = 'fixed'
        styler.style.top = '0px'
        styler.style.bottom = '0px'
        styler.style.pointerEvents = 'none'
        styler.style.zIndex = '30000'
        document.body.appendChild(canvas)
        gameLoop()
    }, [])

    return <></>
}

export default SteamPlugin
