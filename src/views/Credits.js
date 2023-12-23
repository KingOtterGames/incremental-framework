import { Button } from 'antd'

function Credits({ back }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: 0, padding: 0 }}>Developed by</h4>
            <p style={{ margin: 0, padding: 0 }}>
                <span style={{ color: '#fca635' }}>Braymen</span> - <span style={{ color: '#f7dcb7' }}>King Otter Games</span>
            </p>
            <h4 style={{ margin: 0, padding: 0, marginTop: '16px' }}>Published by</h4>
            <p style={{ margin: 0, padding: 0, color: '#fca635' }}>
                <span style={{ color: '#fca635' }}>Braymen</span> - <span style={{ color: '#f7dcb7' }}>King Otter Games</span>
            </p>
            <Button type="primary" className="warning" onClick={back} style={{ width: '160px', marginTop: '100px' }}>
                Back
            </Button>
        </div>
    )
}

export default Credits
