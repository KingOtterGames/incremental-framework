import { useEffect, useReducer } from 'react'
import Save from 'framework/Save'
import StateMachine from 'framework/StateMachine'
import Format from 'framework/Format'
import GeneralConfig from 'config/General'

function Game() {
    const slot = localStorage.getItem('slot') || '0'
    const CurrentState = Save.load(slot)
    const [state, dispatch] = useReducer(StateMachine.reducer, CurrentState)

    /**
     * Core Game Loop
     */
    useEffect(() => {
        // Game Loop Functionality
        const fps = GeneralConfig.loop.fps // Frames Per Second
        const fixedUpdateRate = 1 / fps // Math to calculate the actual FPS
        const timeScale = GeneralConfig.loop.timeScale // Multiplier on delta time, used for speeding, slowing, and pausing mechanics
        let frameId = 0
        let prevFrameTime = 0
        let accumulatedLagTime = 0

        // Handling Stop
        const stop = () => {
            cancelAnimationFrame(frameId)
        }

        // Handling User Inputs
        const onHandleInput = () => {}

        // Handling Ticks
        const tick = (currentFrameTime = 0) => {
            try {
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
                    // StateMachine.onFixedUpdate(state, dispatch, deltaTime)
                    dispatch({ type: 'onFixedUpdate', payload: { deltaTime: deltaTime * timeScale } })
                }

                // Handle onUpdate Logic
                // StateMachine.onUpdate(state, dispatch, deltaTime)
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
                time = setTimeout(refreshPage, 60000 * 30)
            }
        }

        inactivityTime()
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
            <button
                onClick={() => {
                    dispatch({ type: 'Currency.action', payload: {} })
                }}
            >
                Click
            </button>
            <p>{Format.decimal(state.player.gold)}</p>
        </div>
    )
}

export default Game
