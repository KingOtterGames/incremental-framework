const decimal = (amount) => {
    // Zero check
    if (amount === 0) return '0.00'

    // Null check
    if (!amount) return '0.00'

    // Round the number to two decimal places
    const roundedAmount = parseFloat(amount).toFixed(2)

    // Convert the number to a formatted string with commas and trailing zeros
    const [integerPart, decimalPart] = roundedAmount.split('.')
    const formattedIntegerPart = parseInt(integerPart).toLocaleString('en-US')
    const formattedDecimalPart = decimalPart.length === 1 ? decimalPart + '0' : decimalPart

    return `${formattedIntegerPart}.${formattedDecimalPart}`
}

const whole = (amount) => {
    return decimal(amount).split('.')[0]
}

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
    decimal,
    whole,
    timer,
}

export default Formatter
