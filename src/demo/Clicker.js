import { useEffect } from 'react'
import Formatter from 'utilities/Formatter'

function Clicker({ state, dispatch }) {
    useEffect(() => {}, [])

    return (
        <div>
            <button
                onClick={() => {
                    dispatch({ type: 'Currency.give', payload: { currency: 'gold', amount: 1 } })
                }}
            >
                Click
            </button>
            <button
                onClick={() => {
                    console.log(state)
                }}
            >
                State
            </button>
            <button
                onClick={() => {
                    dispatch({ type: 'Manager.speed', payload: { speed: 5 } })
                }}
            >
                5x Speed
            </button>
            <button
                onClick={() => {
                    dispatch({ type: 'Manager.speed', payload: { speed: 1 } })
                }}
            >
                1x Speed
            </button>
            <button
                onClick={() => {
                    dispatch({ type: 'Manager.speed', payload: { speed: 0 } })
                }}
            >
                Paused
            </button>
            <p>{Formatter.decimal(state.player.currency.gold)}</p>
            <button
                onClick={() => {
                    dispatch({ type: 'OfflineProgress.seen', payload: { speed: 0 } })
                }}
            >
                Acknowledge Offline Progress
            </button>
            <p>{state.offlineProgress.seen ? 'Player Seen' : 'Player has not seen'}</p>
            <p>{Formatter.whole(state.offlineProgress.ticksPassed)}</p>
        </div>
    )
}

export default Clicker
