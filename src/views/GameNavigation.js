import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { AppstoreOutlined, SettingOutlined, EnvironmentOutlined, FolderOpenOutlined, PoweroffOutlined } from '@ant-design/icons'
import GameRouter from './GameRouter'
import Manager from 'controllers/Manager'

const { Header, Content, Footer, Sider } = Layout

const items = [
    {
        key: 'Things to Do',
        icon: React.createElement(EnvironmentOutlined),
        label: `Things to Do`,
        children: [
            {
                key: 'Mechanic 1',
                icon: React.createElement(AppstoreOutlined),
                label: `Mechanic 1`,
            },
            {
                key: 'Mechanic 2',
                icon: React.createElement(AppstoreOutlined),
                label: `Mechanic 2`,
            },
            {
                key: 'Mechanic 3',
                icon: React.createElement(AppstoreOutlined),
                label: `Mechanic 3`,
            },
        ],
    },
    {
        key: 'Options',
        icon: React.createElement(SettingOutlined),
        label: `Options`,
        children: [
            {
                key: 'Preferences',
                icon: React.createElement(FolderOpenOutlined),
                label: `Preferences`,
            },
            {
                key: 'Quit to Menu',
                icon: React.createElement(PoweroffOutlined),
                label: `Quit to Menu`,
            },
            {
                key: 'Quit to Desktop',
                icon: React.createElement(PoweroffOutlined),
                label: `Quit to Desktop`,
            },
        ],
    },
]

const GameNavigation = ({ state, dispatch, quit, quitFully }) => {
    const isDemo = Manager.helpers.isDemo()

    useEffect(() => {}, [])

    const onClick = (e) => {
        console.log(e.key)
        switch (e.key) {
            case 'Quit to Menu': {
                quit()
                break
            }
            case 'Quit to Desktop': {
                quitFully()
                break
            }
            default: {
                dispatch({ type: 'Manager.tab', payload: { tab: e.key } })
                break
            }
        }
    }

    return (
        <Layout hasSider>
            <Sider
                width={'300px'}
                className="bg-lvl-1"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <h3 style={{ padding: 0, margin: 0, textAlign: 'center', marginBottom: '16px' }}>{process.env.REACT_APP_DISPLAY_NAME}</h3>
                {isDemo ? (
                    <h4 style={{ padding: '10px 0', margin: 0, textAlign: 'center', marginBottom: '4px', background: '#9c392c' }}>DEMO VERSION</h4>
                ) : (
                    <></>
                )}

                <Menu
                    theme="dark"
                    className="bg-lvl-1"
                    mode="inline"
                    defaultSelectedKeys={['sub1-1']}
                    selectable={false}
                    items={items}
                    defaultOpenKeys={['Things to Do']}
                    onClick={onClick}
                />
                <p style={{ textAlign: 'center', margin: 0, padding: '12px 0', fontWeight: '600', fontSize: '11px', backgroundColor: 'rgba(255,255,255,.02)' }}>
                    Version {process.env.REACT_APP_VERSION}
                </p>
            </Sider>
            <Layout className="bg-lvl-2" style={{ marginLeft: '300px' }}>
                <Header className="bg-lvl-1" style={{ padding: 0, height: '36px' }} />
                <Content className="bg-lvl-2" style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div
                        className="bg-lvl-3"
                        style={{
                            padding: 24,
                            borderRadius: '8px',
                        }}
                    >
                        <GameRouter state={state} dispatch={dispatch} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', background: 'rgba(0,0,0,0)' }}></Footer>
            </Layout>
        </Layout>
    )
}

export default GameNavigation
