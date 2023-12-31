'use client'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Spin } from 'antd'
import './App.css'
import './Theme.css'

import DataFinder from 'utilities/DataFinder'

import Menu from 'views/Menu'
import Game from 'views/Game'

const App = () => {
    const [data, setData] = useState(false)
    useEffect(() => {
        DataFinder.load('items')
            .then(() => {
                DataFinder.load('npcs')
                    .then(() => {
                        setTimeout(() => setData(true), 1000)
                    })
                    .catch((error) => {
                        throw error
                    })
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
                <div className="loading-container">
                    <Spin className="loading-spinner" size="large" />
                    <p>Loading Data...</p>
                </div>
            )}
        </>
    )
}

export default App
