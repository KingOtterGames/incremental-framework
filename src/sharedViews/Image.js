import ImageFinder from 'utilities/ImageFinder'

function Image({ key, style, alt }) {
    return <img src={ImageFinder.get(key)} style={{ imageRendering: 'pixelated', width: '64px', ...style }} alt={alt} />
}

export default Image
