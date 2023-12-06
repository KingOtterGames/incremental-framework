'use client'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// import Menu from 'views/Menu'
import Game from 'views/Game'

const App = () => {
    return (
        <>
            <Routes>
                {/* <Route path="/" element={<Menu />} /> */}
                <Route path="/" element={<Game />} />
            </Routes>
        </>
    )
}

export default App
