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
const action = (state, payload) => {
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
        action,
    },
    helpers: {},
}

export default BaseComponent
