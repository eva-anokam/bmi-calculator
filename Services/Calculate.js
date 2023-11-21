export function calculateBMI(weight, height) {
    const BMI = weight / (Math.pow(height, 2))
    return Math.round(BMI)
}





