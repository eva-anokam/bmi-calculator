import { Router } from "./Services/Router.js"

//link custom elements
import { CalculatePage } from "./Components/CalculatePage.js"
import { calculateBMI } from "./Services/Calculate.js";
import { ResultPage } from "./Components/ResultPage.js";

const app = {}
app.router = Router



// const heightValue = document.querySelector("#height").value;
// const weightValue = document.querySelector("#weight").value;
// const calculateBtn = document.querySelector('.calculate');

// calculateBtn.addEventListener("click", () => {
//     calculateBMI(weightValue, heightValue)
// })

window.addEventListener("DOMContentLoaded", () => {
    app.router.init()
})