import { v4 as uuidv4 } from 'uuid'

const create = () => {
    return uuidv4()
}

const InstanceID = {
    create,
}

export default InstanceID
