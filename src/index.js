import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import SteamPlugin from './framework/Steam'
import { Typography, ConfigProvider, theme } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <HashRouter>
        <input id="fileid" type="file" hidden accept=".json" />
        <SteamPlugin />
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <Typography>
                <App />
            </Typography>
        </ConfigProvider>
    </HashRouter>
)
