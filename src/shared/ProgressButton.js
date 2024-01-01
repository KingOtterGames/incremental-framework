import { Button } from 'antd'

function ProgressButton({ handleClick, style, percent, text, progressColor = 'rgb(78, 100, 226)' }) {
    return (
        <Button type="primary" className="progress" onClick={handleClick} style={{ width: '140px', position: 'relative', ...style }}>
            {' '}
            <span style={{ position: 'absolute', left: 0, right: 0, top: '2px', bottom: 0, zIndex: 9999 }}>{text}</span>{' '}
            <span
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 100 - percent + '%',
                    top: 0,
                    bottom: 0,
                    backgroundColor: progressColor,
                    borderRadius: '6px',
                }}
            ></span>
        </Button>
    )
}

export default ProgressButton
