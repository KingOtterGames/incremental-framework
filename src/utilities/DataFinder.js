import * as YAML from 'yaml'
import ImageFinder from './ImageFinder'
import DataValidation from 'config/DataValidation.json'

function importAll(r) {
    let data = {}
    r.keys().forEach((item) => {
        data[item.replace('./', '')] = r(item)
    })
    return data
}

const data = importAll(require.context('content/data/', true))

const readYAML = (file, key) => {
    return new Promise((res, rej) => {
        // SKIP SCHEMA FILES
        if (key.includes('.md')) res(null)

        // PARSE FILE
        fetch(file)
            .then((r) => r.text())
            .then((text) => {
                const type = key.split('/')[0]
                const category = key.split('/')[1].split('.')[0]
                return res({ type: type, category: category, data: YAML.parse(text) })
            })
    })
}

/**
 * Startup Functionality
 */

const load = () => {
    return new Promise((res, rej) => {
        const promises = []
        const keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            promises.push(readYAML(data[key], key))
        }
        Promise.all(promises).then((list) => {
            // Filter out Schemas
            const filtered = list.filter((e) => e)

            // Set Global Variable for Data
            window.data = filtered

            // All Data Combined
            const combined = getAllCombined()

            // Validate Data
            let valid = validate(combined)
            if (!valid.valid) {
                rej(valid.error)
            }

            // Finish Loading
            res(combined)
        })
    })
}

/**
 * Helper Functions for Data Access
 */
const parse = (raw) => {
    let combined = []
    for (let i = 0; i < raw.length; i++) {
        combined.push(...raw[i])
    }
    return combined
}

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

        /**
         * Valid Types
         */
        const typeArr = DataValidation[datapoint.data].types
        if (!typeArr.includes(datapoint.type))
            return {
                valid: false,
                error: `There was an invalid "type" for data with an id of "${datapoint.id}" of type "${datapoint.type}". Please use a valid data type. Valid types are: [${typeArr}]`,
            }

        /**
         * Valid Sub-Types
         */
        const subtypeArr = DataValidation[datapoint.data].subtypes[datapoint.type]
        if (subtypeArr && subtypeArr.length > 0 && datapoint.subtype && !subtypeArr.includes(datapoint.subtype))
            return {
                valid: false,
                error: `There was an invalid "subtype" for data with an id of "${datapoint.id}" of type "${datapoint.type}" (subtype of "${datapoint.subtype}"). Please use a valid data type. Valid types are: [${subtypeArr}]`,
            }
    }

    return {
        valid: true,
    }
}

const get = (type, category) => {
    let raw = window.data.filter((f) => f.type === type && f.category === category).map((e) => e.data)
    return parse(raw)
}

const getAll = (type) => {
    let raw = window.data.filter((f) => f.type === type).map((e) => e.data)
    return parse(raw)
}

const getAllCombined = () => {
    const raw = []
    const types = [...new Set(window.data.map((d) => d.type))]
    for (let i = 0; i < types.length; i++) {
        let type = types[i]
        raw.push(...parse(window.data.filter((f) => f.type === type).map((e) => e.data)))
    }
    return raw
}

const DataFinder = {
    load,
    get,
    getAll,
    getAllCombined,
}

export default DataFinder
