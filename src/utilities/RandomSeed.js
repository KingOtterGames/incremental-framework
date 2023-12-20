const seedrandom = require('seedrandom')

/**
 * Usage:
 *      let random = RandomSeed.create('13')
 */

const create = (seed) => {
    return seedrandom(seed || new Date())
}

const RandomSeed = {
    create,
}

export default RandomSeed
