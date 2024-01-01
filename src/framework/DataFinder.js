import * as YAML from 'yaml'
import ImageFinder from './ImageFinder'

function importAll(r) {
    let data = {}
    r.keys().forEach((item) => {
        data[item.replace('./', '')] = r(item)
    })
    return data
}

const itemData = importAll(require.context('content/data/items', true))
const npcData = importAll(require.context('content/data/npcs', true))

/**
 * Reads the YAML file and returns it back as JSON
 * @param {string} file - The filepath to the file
 */
const readYAML = (file) => {
    return new Promise((res, rej) => {
        fetch(file)
            .then((r) => r.text())
            .then((text) => {
                return res(YAML.parse(text))
            })
    })
}

/**
 * Loads all the selected entities within the defined entity type and sets the global variable under window.itemsData or window.npcsData
 * @param {string} entityType -  The 'items' or 'npcs' you would like to validate
 */
const load = (entityType) => {
    return new Promise((res, rej) => {
        const data = entityType === 'items' ? itemData : npcData
        const promises = []
        const keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            promises.push(readYAML(data[key]))
        }
        Promise.all(promises).then((list) => {
            let filtered = []

            for (let i = 0; i < list.length; i++) {
                const fileData = list[i]
                for (let j = 0; j < fileData.length; j++) {
                    filtered.push(fileData[j])
                }
            }

            /**
             * Validate Data
             */
            let valid = validate(filtered)
            if (!valid.valid) {
                rej(valid.error)
            }

            /**
             * Set Global Variable for Data
             */
            window[entityValidation(entityType) + 'Data'] = filtered

            /**
             * Finish Loading Entities
             */
            res(filtered)
        })
    })
}

/**
 * Validates the data based on images, unique ids, and anything else added to the validators
 * @param {[string]} data - The parsed data array of entities that will need to be validated
 */
const validate = (data) => {
    for (let i = 0; i < data.length; i++) {
        const datapoint = data[i]

        /**
         * Validate Images
         */
        if (!ImageFinder.validate(datapoint.image))
            return {
                valid: false,
                error: `There was an invalid image path for data with an id of "${datapoint.id}" of type "${datapoint.type}". It does not exist.`,
            }

        /**
         * Unique ID Validation
         */
        if (data.filter((e) => e.id === datapoint.id).length > 1)
            return {
                valid: false,
                error: `There was a duplicate id for data with an id of "${datapoint.id}" of type "${datapoint.type}". Please make this unique.`,
            }
    }

    return {
        valid: true,
    }
}

/**
 * Validates the entity type, to ensure it's proper
 * @param {string} entityType - The 'items' or 'npcs' you would like to validate
 */
const entityValidation = (entityType) => {
    if (entityType !== 'items' && entityType !== 'npcs') throw new Error('Requesting an invalid Entity type ("' + entityType + '" does not exist)')
    return entityType
}

/**
 * Returns all the entities of the selected entity type
 * @param {string} entityType - The 'items' or 'npcs' you would like to validate
 */
const getEntities = (entityType) => {
    return window[entityValidation(entityType) + 'Data']
}

/**
 * Returns all the entities of the selected entity type, filtered down by type
 * @param {string} entityType - The 'items' or 'npcs' you would like to validate
 * @param {string} type - Filter the selected entityType by this type
 */
const getEntitiesByType = (entityType, type) => {
    return window[entityValidation(entityType) + 'Data'].filter((e) => e.type === type)
}

/**
 * Returns all the entities of the selected entity type, filtered down by type and subtypes
 * @param {string} entityType - The 'items' or 'npcs' you would like to validate
 * @param {string} type - Filter the selected entityType by this type
 * @param {string} subtype - Filter further down, where each type may have subtypes
 */
const getEntitiesBySubtype = (entityType, type, subtype) => {
    return window[entityValidation(entityType) + 'Data'].filter((e) => e.type === type && e.subtype === subtype)
}

/**
 * Returns the entity from the selected entity type, based on the specific entity id
 * @param {string} entityType - The 'items' or 'npcs' you would like to validate
 * @param {string} id - The specific entity id you'd like to return
 * @returns
 */
const getEntityByID = (entityType, id) => {
    return window[entityValidation(entityType) + 'Data'].find((e) => e.id === id)
}

const DataFinder = {
    load,
    getEntities,
    getEntitiesByType,
    getEntitiesBySubtype,
    getEntityByID,
}

export default DataFinder
