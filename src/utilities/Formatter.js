import * as ADNotations from '@antimatter-dimensions/notations'
const ADScientific = new ADNotations.ScientificNotation()

/**
 * Format a number into a decimal, so that it looks like "2.00"
 * @param {number} number - The number you wish to format
 */
const decimal = (number) => {
    // Zero check
    if (number === 0) return '0.00'

    // Null check
    if (!number) return '0.00'

    // Round the number to two decimal places
    const roundedAmount = parseFloat(number).toFixed(2)

    // Convert the number to a formatted string with commas and trailing zeros
    const [integerPart, decimalPart] = roundedAmount.split('.')
    const formattedIntegerPart = parseInt(integerPart).toLocaleString('en-US')
    const formattedDecimalPart = decimalPart.length === 1 ? decimalPart + '0' : decimalPart

    return `${formattedIntegerPart}.${formattedDecimalPart}`
}

/**
 * Format a number into a whole number, so that it looks like "2"
 * @param {number} number - The number you wish to format
 */
const whole = (number) => {
    return decimal(number).split('.')[0]
}

/**
 * Format a number into a standard format that adds abbreviations, so that it looks like "2K"
 * @param {number} number - The number you wish to format
 * @param {number} precision - How many decimal points to include
 */
const standard = (number, precision = 2) => {
    const abbreviations = [
        '',
        'K',
        'M',
        'B',
        'T',
        'Qd',
        'Qt',
        'Sx',
        'Sp',
        'Oc',
        'No',
        'Dc',
        'UDc',
        'DDc',
        'TDc',
        'QdDc',
        'QtDc',
        'SxDc',
        'SpDc',
        'ODc',
        'NDc',
        'Vg',
        'UVg',
        'DVg',
        'TVg',
        'QdVg',
        'QtVg',
        'SxVg',
        'SpVg',
        'OVg',
        'NVg',
        'Tg',
        'UTg',
        'DTg',
        'TTg',
        'QdTg',
        'QtTg',
        'SxTg',
        'SpTg',
        'OTg',
        'NTg',
        'Qa',
        'UQa',
        'DQa',
        'TQa',
        'QdQa',
        'QtQa',
        'SxQa',
        'SpQa',
        'OQa',
        'NQa',
        'Qi',
        'UQi',
        'DQi',
        'TQi',
        'QaQi',
        'QtQi',
        'SxQi',
        'SpQi',
        'OQi',
        'NQi',
        'Se',
        'USe',
        'DSe',
        'TSe',
        'QaSe',
        'QtSe',
        'SxSe',
        'SpSe',
        'OSe',
        'NSe',
        'St',
        'USt',
        'DSt',
        'TSt',
        'QaSt',
        'QtSt',
        'SxSt',
        'SpSt',
        'OSt',
        'NSt',
        'Og',
        'UOg',
        'DOg',
        'TOg',
        'QdOg',
        'QtOg',
        'SxOg',
        'SpOg',
        'OOg',
        'NOg',
        'Nn',
        'UNn',
        'DNn',
        'TNn',
        'QdNn',
        'QtNn',
        'SxNn',
        'SpNn',
        'ONn',
        'NNn',
        'Ce',
    ]
    let absNumber = Math.abs(number)

    let abbreviationIndex = 0
    while (absNumber >= 1000 && abbreviationIndex < abbreviations.length - 1) {
        absNumber /= 1000
        abbreviationIndex++
    }

    const formattedNumber = Math.floor(absNumber * Math.pow(10, precision)) / Math.pow(10, precision)
    const suffix = abbreviations[abbreviationIndex]

    return number >= 0 ? `${formattedNumber}${suffix}` : `-${formattedNumber}${suffix}`
}

/**
 * Format a number into scientific notation, so that it looks like "2.000e10"
 * @param {number} number - The number you wish to format
 * @param {number} precision - How many decimal points to include
 */
const scientific = (number, precision = 3) => {
    return ADScientific.format(number, precision, 0)
}

/**
 * Format a time in seconds into a timer format, so that it looks like "23 minutes" or "23 hours"
 * @param {number} seconds - The time you wish to format in seconds
 */
const timer = (seconds) => {
    const minutes = seconds / 60
    const hours = minutes / 60
    if (minutes < 1) {
        return Math.floor(seconds) + ' second' + (Math.floor(seconds) !== 1 ? 's' : '')
    } else if (minutes < 60) {
        return Math.floor(minutes) + ' minute' + (Math.floor(minutes) !== 1 ? 's' : '')
    } else {
        return hours.toFixed(1) + ' hour' + (Math.floor(hours) !== 1 ? 's' : '')
    }
}

const Formatter = {
    standard,
    decimal,
    whole,
    timer,
    scientific,
}

export default Formatter
