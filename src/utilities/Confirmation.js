import { Modal } from 'antd'

const remove = (handleConfirm, buttonText, description) => {
    Modal.confirm({
        title: <h3 style={{ margin: 0, padding: 0 }}>{description}</h3>,
        content: null,
        styles: {
            mask: {
                backgroundColor: 'rgba(0,0,0,.85)',
            },
        },
        maskClosable: true,
        onOk: handleConfirm,
        okText: buttonText,
        okButtonProps: { style: { backgroundColor: 'rgb(188, 59, 59)' } },
        cancelText: 'Cancel',
        onCancel: () => {},
        cancelButtonProps: { style: { display: true } },
    })
}

const Confirmation = {
    remove,
}

export default Confirmation
