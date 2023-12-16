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
            <p>{Formatter.decimal(state.player.currency.gold)}</p>
        </div>
    )
}

export default Clicker
