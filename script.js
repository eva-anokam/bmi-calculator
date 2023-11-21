async function loadBMIChart() {
    try {
        const response = await fetch("./bmiChart.json");
        const chart = await response.json()
        return chart
    } catch (error) {
        console.error("Error loading BMI chart:", error)
    }
}

async function interpreteBMI(bmi, age) {
    const ageNum = parseInt(age)
    const chart = await loadBMIChart()
    let arr = []
    if (ageNum > 20) {
        const adultChart = chart.adults
        for (const category in adultChart) {
            arr.push({
                key: category,
                value: adultChart[category]
            })
        }
        
        console.log(arr)
    }
}




window.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.querySelector(".btn");
    const height = document.querySelector("#height");
    const displayHeightValue = document.querySelector(".display__height")
    const weight = document.querySelector("#weight");
    const age = document.querySelector("#age")
    const weightAdd = document.querySelector(".weight .add");
    const weightMinus = document.querySelector(".weight .minus")

    const ageAdd = document.querySelector(".age .add");
    const ageMinus = document.querySelector(".age .minus")
    

    height.addEventListener("input", () => {
        displayHeightValue.textContent = height.value
    })
    function add(value) {
        return ++value; 
    }

    function subtract(value) {
        return --value;
    }
    
    weightAdd.addEventListener("click", () => {
            const weightValue = weight.value
            const result = add(weightValue)
            weight.value = result
        })
    weightMinus.addEventListener("click", () => {
        const weightValue = weight.value
        const result = subtract(weightValue)
        weight.value = result
    })

    ageAdd.addEventListener("click", () => {
        const ageValue = age.value
        const result = add(ageValue)
        age.value = result
    })

    ageMinus.addEventListener("click", () => {
        const ageValue = age.value
        const result = subtract(ageValue)
        age.value = result
    })


    calculateBtn.addEventListener("click", () => {
        const heightValue = height.value;
        const weightValue = weight.value
        
        console.log(calculateBMI(weightValue, heightValue))
    })

})