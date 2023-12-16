import { useEffect, useReducer } from 'react'
import Save from 'framework/Save'
import StateMachine from 'framework/StateMachine'
import GeneralConfig from 'config/General'
import ManagerController from 'controllers/Manager'

/**
 * DEMO: Delete these imports for a real project
 */
import Clicker from 'demo/Clicker'

function Game() {
    const slot = localStorage.getItem('slot') || '0'
    const CurrentState = Save.load(slot)
    const [state, dispatch] = useReducer(StateMachine.reducer, CurrentState)

    /**
     * Core Game Loop
     */
    useEffect(() => {
        console.log(ManagerController.helpers.isDemo())
        // Game Loop Functionality
        const fps = GeneralConfig.loop.fps // Frames Per Second
        const fixedUpdateRate = 1 / fps // Math to calculate the actual FPS
        const timeScale = GeneralConfig.loop.timeScale // Multiplier on delta time, used for speeding, slowing, and pausing mechanics
        let frameId = 0
        let prevFrameTime = 0
        let accumulatedLagTime = 0

        // Handle Offline Progress
        if (state.options.offlineProgress) {
            const lastTick = state.lastTick ? new Date(state.lastTick) : new Date()
            const now = new Date()
            const ticksPassed = Math.floor(Math.abs(now.getTime() - lastTick.getTime()) / (fps * 1000))
            dispatch({ type: 'OfflineProgress.calculate', payload: { ticksPassed } })
        }

        // Handling Stop
        const stop = () => {
            cancelAnimationFrame(frameId)
        }

        // Handling User Inputs
        const onHandleInput = () => {}

        // Handling Ticks
        const tick = (currentFrameTime = 0) => {
            try {
                // Set Last Tick
                dispatch({ type: 'Manager.lastTick', payload: {} })

                frameId = requestAnimationFrame(tick)

                // Check and process player inputs
                onHandleInput()

                // Calculate Lag & Delta Time
                const deltaMS = currentFrameTime - prevFrameTime
                const deltaTime = Math.min(fixedUpdateRate, deltaMS / 1000)

                accumulatedLagTime += deltaTime

                // Handle onFixedUpdate Logic
                while (accumulatedLagTime >= fixedUpdateRate) {
                    accumulatedLagTime -= fixedUpdateRate
                    dispatch({ type: 'onFixedUpdate', payload: { deltaTime: deltaTime * timeScale } })
                }

                // Handle onUpdate Logic
                dispatch({ type: 'onUpdate', payload: { deltaTime: deltaTime * timeScale } })

                // Set Frame Time
                prevFrameTime = currentFrameTime
            } catch (err) {
                stop()
                throw err
            }
        }

        tick()

        return stop

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * Auto-save Timer, used for keeping things saved automatically
     */
    useEffect(() => {
        let activityTimer = function () {
            let time
            resetTimer()

            function saveGame() {
                Save.save(state, slot)
                resetTimer()
            }

            function resetTimer() {
                clearTimeout(time)
                time = setTimeout(saveGame, 60000 * 5)
            }
        }

        activityTimer()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * Inactivity Timer, used for helping with mitigating memory issues
     */
    useEffect(() => {
        let inactivityTime = function () {
            console.log('i')
            let time

            window.onload = resetTimer
            document.onmousemove = resetTimer
            document.onclick = resetTimer

            function refreshPage() {
                console.log('No activity for 30 minutes. Refreshing the page.')
                window.location.reload()
            }

            function resetTimer() {
                clearTimeout(time)
                time = setTimeout(refreshPage, 60000 * GeneralConfig.inactivityTimer.minutes)
            }
        }

        if (GeneralConfig.inactivityTimer.enabled) inactivityTime()
    }, [])

    /**
     * Save on Reload
     */
    useEffect(() => {
        const handler = () => {
            Save.save(state, slot)
        }

        window.addEventListener('beforeunload', handler)

        return () => {
            window.removeEventListener('beforeunload', handler)
        }
    }, [state, slot])

    return (
        <div>
            <Clicker state={state} dispatch={dispatch} />
        </div>
    )
}

export default Game
