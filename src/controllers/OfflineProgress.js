// ------------------------------------------------------------------------------------------------------------------------------------
// ---- Built-Ins (These are used in the engine and are required for every controller)
// ------------------------------------------------------------------------------------------------------------------------------------
/**
 * The 'onUpdate' Function - Utilize in Timer-based calculations and math
 */
const onUpdate = (state, deltaTime) => {
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
const seen = (state, payload) => {
    state.offlineProgress.seen = true
    state.offlineProgress.ticksPassed = 0
    state.offlineProgress.resources = []
    return state
}

const calculate = (state, payload) => {
    const { ticksPassed } = payload

    /**
     * Do Offline Progress Stuff Here
     * resources mock: [{ name, image, amount }]
     */

    state.offlineProgress.ticksPassed = ticksPassed
    state.offlineProgress.seen = ticksPassed >= 5 ? false : true

    /**
     * END Offline Stuff
     */
    return state
}

// ------------------------------------------------------------------------------------------------------------------------------------
// ---- Helpers (State cannot be modified)
// ------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------------
// ---- Export of Controller (You'll need to route it out so you can utilize the functions in the dispatchers)
// ------------------------------------------------------------------------------------------------------------------------------------
const BaseComponent = {
    builtins: {
        onUpdate,
        onFixedUpdate,
    },
    actions: {
        seen,
        calculate,
    },
    helpers: {},
}

export default BaseComponent
