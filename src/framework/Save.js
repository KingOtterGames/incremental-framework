import cloneDeep from 'lodash.clonedeep'
import DefaultState from '__DefaultState__.json'

const SAVE_KEY = 'save-'

const load = (slot) => {
    let LoadedState = JSON.parse(localStorage.getItem(SAVE_KEY + slot))
    if (LoadedState) return cloneDeep(patch(version(LoadedState), cloneDeep(DefaultState)))
    return cloneDeep(DefaultState)
}

const save = (state, slot) => {
    console.log(JSON.stringify(state))
    localStorage.setItem(SAVE_KEY + slot, JSON.stringify(state))
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

const version = (loadedState) => {
    return loadedState
}

const Save = {
    load,
    patch,
    save,
    version,
}

export default Save
