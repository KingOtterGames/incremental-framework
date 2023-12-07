function importAll(r) {
    let images = {}
    r.keys().forEach((item) => {
        images[item.replace('./', '')] = r(item)
    })
    return images
}

const images = importAll(require.context('../../../assets/images', true))

const get = (key) => {
    return images[key]
}

const Images = {
    get,
}

export default Images
