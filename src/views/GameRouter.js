import { useEffect } from 'react'
import Preferences from 'views/Tab-Preferences/Preferences'

/**
 * DEMO: Delete these imports for a real project
 */
import Clicker from 'views/Tab-Demo/Demo'

function GameRouter({ state, dispatch }) {
    useEffect(() => {}, [])

    return (
        <>
            {state.tab === 'Mechanic 1' ? <Clicker state={state} dispatch={dispatch} /> : <></>}
            {state.tab === 'Preferences' ? <Preferences state={state} dispatch={dispatch} /> : <></>}
        </>
    )
}

export default GameRouter
