import { useState } from 'react'
import { Input, Button, Checkbox } from 'antd'
import { BulbOutlined } from '@ant-design/icons'
import { uniqueNamesGenerator, names } from 'unique-names-generator'
import './CharacterCreator.css'

const config = {
    dictionaries: [names],
}

function CharacterCreator({ state, dispatch, quit }) {
    const [name, setName] = useState('')

    const onChangeFlag = (e, key) => {
        dispatch({ type: 'Manager.flag', payload: { key, checked: e.target.checked } })
    }

    const randomName = () => {
        setName(uniqueNamesGenerator(config))
    }

    const notValidCreation = name.length === 0 || name.length > 16

    return (
        <div style={{ margin: 'auto', textAlign: 'center' }}>
            <h1 style={{ padding: 0, margin: 0, marginTop: '64px', textAlign: 'center', marginBottom: '16px' }}>{process.env.REACT_APP_DISPLAY_NAME}</h1>
            <h4>What would you like to be called?</h4>
            <Input
                placeholder="Character Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '240px' }}
                count={{
                    show: true,
                    max: 16,
                }}
                suffix={<BulbOutlined className="hoverable-input-icon" onClick={randomName} />}
            />
            <br />
            <Checkbox onChange={(e) => onChangeFlag(e, 'offlineProgress')} key={'test'} checked={state.flags.offlineProgress} style={{ marginTop: '16px' }}>
                Offline Progress
            </Checkbox>
            <p style={{ margin: 0, padding: 0, fontStyle: 'italic', color: 'rgba(255,255,255,.6)', marginBottom: '16px' }}>
                Turning this off will disable any form of offline progression.
            </p>
            <Button type="primary" className={'warning'} onClick={quit} style={{ width: '160px', marginTop: '16px' }}>
                Go Back
            </Button>
            <Button
                type="primary"
                className={notValidCreation ? 'disabled-button' : 'success'}
                disabled={notValidCreation}
                onClick={() => {
                    dispatch({ type: 'Manager.createCharacter', payload: { name: name } })
                }}
                style={{ width: '160px', marginTop: '16px' }}
            >
                Create Character
            </Button>
        </div>
    )
}

export default CharacterCreator
