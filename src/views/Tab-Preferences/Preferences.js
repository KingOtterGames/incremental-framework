import { useEffect } from 'react'
import { Checkbox } from 'antd'

function Preferences({ state, dispatch }) {
    useEffect(() => {}, [])

    const onChange = (e, key) => {
        dispatch({ type: 'Manager.flag', payload: { key, checked: e.target.checked } })
    }

    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', overflow: 'hidden', color: 'white' }}>
            <Checkbox onChange={(e) => onChange(e, 'offlineProgress')} key={'test'} checked={state.flags.offlineProgress}>
                Offline Progress
            </Checkbox>
            <p style={{ margin: 0, padding: 0, fontStyle: 'italic', color: 'rgba(255,255,255,.6)', marginBottom: '16px' }}>
                Turning this off will disable any form of offline progression.
            </p>
        </div>
    )
}

export default Preferences
