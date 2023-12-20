'use client'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import DataFinder from 'utilities/DataFinder'

import Menu from 'views/Menu'
import Game from 'views/Game'

const App = () => {
    const [data, setData] = useState(false)
    useEffect(() => {
        DataFinder.load()
            .then(() => {
                setData(true)
            })
            .catch((error) => {
                throw error
            })
    }, [])
    return (
        <>
            {data ? (
                <>
                    <Routes>
                        <Route path="/" element={<Menu />} />
                        <Route path="/game" element={<Game />} />
                    </Routes>
                </>
            ) : (
                <></>
            )}
        </>
    )
}

export default App
