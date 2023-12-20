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

const ImageFinder = {
    get,
}

export default ImageFinder
