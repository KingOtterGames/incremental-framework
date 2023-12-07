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

const Helper = {
    decimal,
    whole,
}

export default Helper
