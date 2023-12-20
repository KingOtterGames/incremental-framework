import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Save from 'framework/Save'
import Formatter from 'utilities/Formatter'
import Manager from 'controllers/Manager'
import SaveManager from 'utilities/SaveManager'

const Menu = () => {
    const navigate = useNavigate()

    useEffect(() => {}, [])

    const isDemo = Manager.helpers.isDemo()

    return (
        <div>
            {[...Array(10)].map((e, i) => {
                const hasSave = localStorage.getItem('save-' + i)
                const playtime = hasSave && Save.load(i).playtime

                return (
                    <div key={'saveslot-' + i}>
                        <button
                            style={{ width: '100px' }}
                            onClick={() => {
                                localStorage.setItem('slot', i)
                                navigate('/game')
                            }}
                        >
                            {hasSave ? 'Continue' : 'New Game'}
                        </button>
                        <button
                            onClick={() => {
                                SaveManager.importSave(i)
                            }}
                        >
                            Import
                        </button>
                        <button
                            disabled={!hasSave}
                            onClick={() => {
                                SaveManager.exportSave(i)
                            }}
                        >
                            Export
                        </button>
                        <button
                            disabled={!hasSave}
                            onClick={() => {
                                localStorage.removeItem('save-' + i)
                                navigate('/')
                            }}
                        >
                            Delete
                        </button>{' '}
                        <span>{hasSave ? Formatter.timer(playtime) : ''}</span>
                    </div>
                )
            })}
            <p>Build: v{process.env.REACT_APP_VERSION}</p>
            <p>Demo: {isDemo}</p>
        </div>
    )
}

export default Menu
