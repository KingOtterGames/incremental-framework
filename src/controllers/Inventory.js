import DataFinder from 'framework/DataFinder'
import InstanceID from 'utilities/InstanceID'

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
const add = (state, payload) => {
    const { item, quantity = 1 } = payload

    // Get Inventory
    const inventory = state.player.inventory

    // Get Item Information
    const metadata = DataFinder.getEntityByID('items', item)

    // Check if valid item
    if (!metadata) return state

    // Check if stackable
    const stackable = metadata.stackable

    // Check if the item already exists in the inventory
    const existingItem = inventory.find((i) => i.item === item)

    // Add the Item depending on if it's stackable or not and if it exists already
    if (existingItem && stackable) {
        existingItem.quantity += quantity
    } else {
        inventory.push({ item, quantity: stackable ? quantity : 1, instance: stackable ? '' : InstanceID.create() })
    }

    return state
}

const remove = (state, payload) => {
    const { item, quantity = 1, instance = '' } = payload

    // Get Inventory
    const inventory = state.player.inventory

    // Get Item Information
    const metadata = DataFinder.getEntityByID('items', item)

    // Check if valid item
    if (!metadata) return state

    // Check if stackable
    const stackable = metadata.stackable

    // Safety check if not stackable and no instance id
    if (!stackable && instance === '') {
        console.log('ERROR: Missing the instance id for an item removal')
        return state
    }

    // Check if the item already exists in the inventory
    const existingItem = inventory.find((i) => {
        if (stackable) return i.item === item
        return i.item === item && i.instance === instance
    })

    // Remove the item or items
    if (existingItem) {
        existingItem.quantity -= quantity

        // Remove item from inventory if completely gone
        if (existingItem.quantity <= 0) {
            state.player.inventory = inventory.filter((i) => {
                if (stackable) return i.item !== item
                return i.instance !== instance
            })
        }
    }

    return state
}

// ------------------------------------------------------------------------------------------------------------------------------------
// ---- Helpers (State cannot be modified)
// ------------------------------------------------------------------------------------------------------------------------------------
const search = (state, item) => {
    return state.player.inventory.filter((i) => i.item === item)
}

const searchByFilters = (state, type = '', subtype = '') => {
    return state.player.inventory.filter((i) => {
        const metadata = DataFinder.getEntityByID('items', i.item)
        if (!type && !subtype) return true
        if (type && !subtype) return metadata.type === type
        return metadata.type === type && metadata.subtype === subtype
    })
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
        add,
        remove,
    },
    helpers: {
        search,
        searchByFilters,
    },
}

export default BaseComponent
