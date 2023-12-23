import { useEffect } from 'react'
import Formatter from 'utilities/Formatter'
import { Button } from 'antd'

const Demo = ({ state, dispatch, quit }) => {
    const slot = localStorage.getItem('slot')

    useEffect(() => {}, [])

    return (
        <div>
            <button
                onClick={() => {
                    dispatch({ type: 'Currency.add', payload: { currency: 'gold', amount: 1 } })
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
                    dispatch({ type: 'Manager.speed', payload: { speed: 60 } })
                }}
            >
                60x Speed
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
            <p>Slot: {slot}</p>
            <p>Playtime: {Formatter.timer(state.playtime)}</p>
            <Button type="primary" className="primary" onClick={() => {}}>
                Primary
            </Button>
            <Button type="primary" className="secondary" onClick={() => {}}>
                Secondary
            </Button>
            <Button type="primary" className="tertiary" onClick={() => {}}>
                Tertiary
            </Button>
            <Button type="primary" className="warning" onClick={() => {}}>
                Warning
            </Button>
            <Button type="primary" className="purchase" onClick={() => {}}>
                Purchase
            </Button>
        </div>
    )
}

export default Demo
