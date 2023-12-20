import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Save from 'framework/Save'
import Formatter from 'utilities/Formatter'

const Menu = () => {
    const navigate = useNavigate()

    useEffect(() => {}, [])

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
                        <button disabled={!hasSave} onClick={() => {}}>
                            Import
                        </button>
                        <button disabled={!hasSave} onClick={() => {}}>
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
        </div>
    )
}

export default Menu
