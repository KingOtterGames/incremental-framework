// ------------------------------------------------------------------------------------------------------------------------------------
// ---- Built-Ins (These are used in the engine and are required for every controller)
// ------------------------------------------------------------------------------------------------------------------------------------
/**
 * The 'onUpdate' Function - Utilize in Timer-based calculations and math
 */
const onUpdate = (state, deltaTime) => {
    /**
     * Used for tracking playtime (Doesn't include when paused)
     */
    if (state.timeScale > 0) {
        state.playtime += deltaTime / state.timeScale
    }

    return state
}

/**
 * The 'onFixedUpdate' Function - Utilize where you want a predictable run, such as every second. Great for AI.
 */
const onFixedUpdate = (state, deltaTime) => {
    return state
}

// ------------------------------------------------------------------------------------------------------------------------------------
// ---- Actions (State can be altered and utilizes the dispatch events)
// ------------------------------------------------------------------------------------------------------------------------------------
const lastTick = (state, payload) => {
    state.lastTick = new Date()
    return state
}

const speed = (state, payload) => {
    const { speed } = payload
    state.timeScale = speed
    return state
}

const tab = (state, payload) => {
    state.tab = payload.tab
    return state
}

const flag = (state, payload) => {
    const { key, checked } = payload
    state.flags[key] = checked
    return state
}

const createCharacter = (state, payload) => {
    state.player.name = payload.name
    return state
}

// ------------------------------------------------------------------------------------------------------------------------------------
// ---- Helpers (State cannot be modified)
// ------------------------------------------------------------------------------------------------------------------------------------
const isDemo = () => {
    return process.env.REACT_APP_DEMO === 'true' ? true : false
}

// ------------------------------------------------------------------------------------------------------------------------------------
// ---- Export of Controller (You'll need to route it out so you can utilize the functions in the dispatchers)
// ------------------------------------------------------------------------------------------------------------------------------------
const BaseComponent = {
    builtins: {
        onUpdate,
        onFixedUpdate,
    },
    actions: {
        lastTick,
        speed,
        tab,
        flag,
        createCharacter,
    },
    helpers: {
        isDemo,
    },
}

export default BaseComponent
