import proxiedResult from "../Services/Result.js";
import { Router } from "../Services/Router.js";

export class ResultPage extends HTMLElement {
    constructor() {
        super();

        //create and attach the shadowDOM
        this.shadowDOM = this.attachShadow({ mode: "open" });

        //load css
        const styles = document.createElement("style")
        this.shadowDOM.appendChild(styles)

        async function loadCSS() {
            const req = await fetch("../bmi-calculator/Components/ResultPage.css");
            const css = await req.text()
            styles.textContent = css
        }
        loadCSS()
    }
    //define what happens when the custom element is connected to the DOM
    connectedCallback() {
        const template = document.getElementById("result-page-template");
        if (template) {
            const content = template.content.cloneNode(true);
            this.shadowDOM.appendChild(content);
        } else {
            console.error("Template not found");
        }

        this.render(); //initial render
        this.setupEventListeners()
        //dispaly result link
        if (proxiedResult.value !== null) {
            const resultLink = document.querySelector(".result")

            resultLink.removeAttribute("hidden")
        }
        //add possible proxy
        window.addEventListener("resultChanged", (event) => {
            const newValue = event.detail.value;
            if (newValue !== proxiedResult.value) {
                proxiedResult.value = newValue //update proxied result
                this.render() //trigger re-render only if the result has changed
            }
        })
    }
    render() {
        const result = this.shadowDOM.querySelector("#result");
        result.innerHTML = "";
        result.innerHTML = `
             <h2>Your result</h2>
            <div class="result-container">
                <p>${proxiedResult.value}</p>
                </div>
            <div class="result-btns">
                <a href="" class="go-to-interprete">See the interpretation</a>
            <a href="" class="re-calculate">Re-calculate</a>
            </div>
        `;
    }
    setupEventListeners() {
        const reCalculate = this.shadowDOM.querySelector(".re-calculate");
        reCalculate.addEventListener("click", (event) => {
            event.preventDefault()
            Router.go("#/calculate")
        })
        const goToInterprete = this.shadowDOM.querySelector(".go-to-interprete")
        goToInterprete.addEventListener("click", (event) => {
            event.preventDefault()
            Router.go("#/interpretation")
        })
    }
}
customElements.define("result-page", ResultPage)
