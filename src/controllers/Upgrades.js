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
const upgrade = (state, { name }) => {
    // Get Current Upgrade
    let upgrade = getUpgrade(state, name)

    // If level 0, we need to add the upgrade to the save
    if (upgrade.level === 0) {
        state.upgrades.push({ name: name, level: 1 })
    } else {
        upgrade.level++
    }
    return state
}

// ------------------------------------------------------------------------------------------------------------------------------------
// ---- Helpers (State cannot be modified)
// ------------------------------------------------------------------------------------------------------------------------------------
const getUpgrade = (state, name) => {
    return state.upgrades.find((upgrades) => upgrades.name === name) || { name, level: 0 }
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
        upgrade,
    },
    helpers: {
        getUpgrade,
    },
}

export default BaseComponent
