import { Router } from "./Services/Router.js"

//link custom elements
import { CalculatePage } from "./Components/CalculatePage.js"
import { calculateBMI } from "./Services/Calculate.js";
import { ResultPage } from "./Components/ResultPage.js";
import { InterpretationPage } from "./Components/InterpretationPage.js";
import proxiedResult from "./Services/Result.js";

const app = {}
app.router = Router


window.addEventListener("DOMContentLoaded", () => {
    app.router.init()
})