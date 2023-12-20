import { useEffect } from 'react'

/**
 * DEMO: Delete these imports for a real project
 */
import Clicker from 'views/Tab-Demo/Demo'

const GameNavigation = ({ state, dispatch, quit }) => {
    useEffect(() => {}, [])

    return (
        <div>
            <Clicker state={state} dispatch={dispatch} quit={quit} />
        </div>
    )
}

export default GameNavigation
