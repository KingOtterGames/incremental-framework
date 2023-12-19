import cloneDeep from 'lodash.clonedeep'

function importAll(r) {
    let files = {}
    r.keys().forEach((item) => {
        if (!item.includes('controller')) {
            files[item.replace('./', '').replace('.js', '')] = r(item)
        }
    })
    return files
}

const Controllers = importAll(require.context('controllers/', false, /\.(js)$/))

const onUpdate = (state, deltaTime) => {
    let newState = cloneDeep(state)
    let keys = Object.keys(Controllers)
    for (let i = 0; i < keys.length; i++) {
        let file = Controllers[keys[i]]
        if (file?.default?.builtins?.onUpdate) {
            newState = cloneDeep(file.default.builtins.onUpdate(newState, deltaTime * state.timeScale))
        }
    }
    return newState
}

const onFixedUpdate = (state, deltaTime) => {
    let newState = cloneDeep(state)
    let keys = Object.keys(Controllers)
    for (let i = 0; i < keys.length; i++) {
        let file = Controllers[keys[i]]
        if (file?.default?.builtins?.onFixedUpdate) {
            newState = cloneDeep(file.default.builtins.onFixedUpdate(newState, deltaTime * state.timeScale))
        }
    }
    return newState
}

const updateActions = { onUpdate, onFixedUpdate }

const reducer = (state, action) => {
    let newState = cloneDeep(state)

    if (Object.keys(updateActions).includes(action.type)) {
        return cloneDeep(updateActions[action.type](state, action.payload.deltaTime))
    }

    let tokens = action.type.split('.')
    let keys = Object.keys(Controllers)
    for (let i = 0; i < keys.length; i++) {
        let file = Controllers[keys[i]]
        if (tokens[0] === keys[i]) {
            let functions = Object.keys(file.default.actions)
            for (let j = 0; j < functions.length; j++) {
                if (tokens[1] === functions[j]) {
                    newState = cloneDeep(file.default.actions[functions[j]](newState, action.payload))
                }
            }
        }
    }

    return newState
}

const StateMachine = {
    reducer,
    onUpdate,
    onFixedUpdate,
}

export default StateMachine
