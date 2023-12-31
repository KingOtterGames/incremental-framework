import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Save from 'framework/Save'
import Formatter from 'utilities/Formatter'
import Manager from 'controllers/Manager'
import SaveManager from 'framework/SaveManager'
import { Button } from 'antd'
import Credits from './Credits'
import Confirmation from 'utilities/Confirmation'
import GeneralConfig from 'config/General.json'

const Menu = () => {
    const [showCredits, setShowCredits] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {}, [])

    const isDemo = Manager.helpers.isDemo()

    return (
        <div>
            <h1 style={{ padding: 0, margin: 0, marginTop: '64px', textAlign: 'center', marginBottom: '16px' }}>{process.env.REACT_APP_DISPLAY_NAME}</h1>
            {showCredits ? (
                <Credits back={() => setShowCredits(false)} />
            ) : (
                <>
                    {[...Array(GeneralConfig.general.saveSlots)].map((e, i) => {
                        const hasSave = localStorage.getItem('save-' + i)
                        const decodedSave = hasSave && Save.load(i)
                        const playtime = decodedSave && decodedSave.playtime
                        const lastPlayed = decodedSave && new Date(decodedSave.lastTick).toLocaleString()

                        return (
                            <div
                                key={'saveslot-' + i}
                                style={{ padding: '8px 16px', backgroundColor: 'rgba(0,0,0,.3)', margin: '12px auto', width: '600px', borderRadius: '8px' }}
                            >
                                <h5 style={{ letterSpacing: '1px', padding: 0, margin: 0, fontWeight: '700', fontSize: '12px' }}>SAVE SLOT #{i + 1}</h5>
                                <h5 style={{ color: '#fca635', padding: 0, margin: 0, fontWeight: '500', fontSize: '18px', height: '24px' }}>
                                    {hasSave ? (decodedSave.player.name === '' ? 'Unnamed Character' : decodedSave.player.name) : ''}
                                </h5>
                                <h5 style={{ color: '#fae0be', padding: 0, margin: 0, fontWeight: '400', fontSize: '11px', height: '17px' }}>
                                    {hasSave ? (
                                        <>
                                            Last Played: {lastPlayed}
                                            <span style={{ float: 'right', color: '#befac5' }}>Playtime: {Formatter.timer(playtime)}</span>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </h5>

                                <Button
                                    type="primary"
                                    className={hasSave ? 'primary' : 'secondary'}
                                    onClick={() => {
                                        localStorage.setItem('slot', i)
                                        navigate('/game')
                                    }}
                                    style={{ width: '120px', marginLeft: 0 }}
                                >
                                    {hasSave ? 'Continue' : 'New Game'}
                                </Button>
                                <Button
                                    type="primary"
                                    className="tertiary"
                                    onClick={() => {
                                        SaveManager.importSave(i)
                                    }}
                                    style={{ width: '120px' }}
                                >
                                    Import
                                </Button>
                                {hasSave ? (
                                    <>
                                        <Button
                                            type="primary"
                                            className={'tertiary'}
                                            onClick={() => {
                                                SaveManager.exportSave(i)
                                            }}
                                            style={{ width: '120px' }}
                                        >
                                            Export
                                        </Button>
                                        <Button
                                            type="primary"
                                            className={'warning'}
                                            onClick={() => {
                                                Confirmation.remove(
                                                    () => {
                                                        localStorage.removeItem('save-' + i)
                                                        navigate('/')
                                                    },
                                                    'Delete',
                                                    'Are you sure you want to delete your save?'
                                                )
                                            }}
                                            style={{ width: '120px', float: 'right', marginRight: 0 }}
                                        >
                                            Delete
                                        </Button>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )
                    })}
                    <center>
                        <Button
                            type="primary"
                            className="purchase"
                            onClick={() => {
                                setShowCredits(true)
                            }}
                            style={{ width: '160px' }}
                        >
                            Credits
                        </Button>
                        <Button
                            type="primary"
                            className="warning"
                            onClick={() => {
                                window.electronAPI.quit()
                            }}
                            style={{ width: '160px' }}
                        >
                            Quit
                        </Button>
                    </center>
                    {isDemo ? (
                        <h4
                            style={{
                                padding: '10px 0',
                                margin: 'auto',
                                textAlign: 'center',
                                marginBottom: '0',
                                paddingBottom: '0',
                            }}
                        >
                            DEMO VERSION
                        </h4>
                    ) : (
                        <></>
                    )}
                    <p style={{ textAlign: 'center', margin: 0, fontWeight: '600', fontSize: '11px' }}>Version {process.env.REACT_APP_VERSION}</p>
                </>
            )}
        </div>
    )
}

export default Menu
