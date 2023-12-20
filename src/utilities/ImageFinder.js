function importAll(r) {
    let images = {}
    r.keys().forEach((item) => {
        images[item.replace('./', '')] = r(item)
    })
    return images
}

const images = importAll(require.context('content/images/', true))

const get = (key) => {
    return images[key]
}

const validate = (key) => {
    if (images[key]) return true
    return false
}

const ImageFinder = {
    get,
    validate,
}

export default ImageFinder
