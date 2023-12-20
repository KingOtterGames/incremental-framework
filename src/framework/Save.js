import cloneDeep from 'lodash.clonedeep'
import DefaultState from '__DefaultState__.json'
import LZString from 'lz-string'

const SAVE_KEY = 'save-'

const load = (slot) => {
    let data = localStorage.getItem(SAVE_KEY + slot)
    if (data) {
        return cloneDeep(patch(version(JSON.parse(decode(data))), cloneDeep(DefaultState)))
    }
    return cloneDeep(DefaultState)
}

const save = (state, slot) => {
    localStorage.setItem(SAVE_KEY + slot, encode(JSON.stringify(state)))
    return cloneDeep(state)
}

const patch = (oldJSON, newJSON) => {
    function isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item)
    }

    for (let key in oldJSON) {
        if (!newJSON.hasOwnProperty(key)) {
            delete oldJSON[key]
        } else if (isObject(oldJSON[key]) && isObject(newJSON[key])) {
            patch(oldJSON[key], newJSON[key])
        }
    }

    for (let key in newJSON) {
        if (!oldJSON.hasOwnProperty(key)) {
            oldJSON[key] = newJSON[key]
        } else if (isObject(oldJSON[key]) && isObject(newJSON[key])) {
            patch(oldJSON[key], newJSON[key])
        }
    }
    return oldJSON
}

const encode = (data) => {
    return LZString.compress(data)
}

const decode = (data) => {
    return LZString.decompress(data)
}

const version = (loadedState) => {
    return loadedState
}

const Save = {
    load,
    patch,
    save,
    version,
    encode,
    decode,
}

export default Save
