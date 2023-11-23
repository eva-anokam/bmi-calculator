import { calculateBMI } from "../Services/Calculate.js";
import proxiedResult from "../Services/Result.js";
import { Router } from "../Services/Router.js";

export class CalculatePage extends HTMLElement {
    constructor() {
        super();
        //create and attach the shadow DOM
        this.shadowDOM = this.attachShadow({ mode: "open" });

        const styles = document.createElement("style");
        this.shadowDOM.appendChild(styles)
        //async load css
        async function loadCss() {
            const req = await fetch("../bmi-calculator/Components/CalculatePage.css")
            const css = await req.text()
            styles.textContent = css
        }
        loadCss()
    }
    //define what happens when the custom element is connected to the DOM
    connectedCallback() {
        const template = document.getElementById("calculate-page-template");
        if (template) {
            const content = template.content.cloneNode(true)
            this.shadowDOM.appendChild(content)
        } else {
            console.error("Caluclate page template not found")
        }
        //TODO add proxy custom event 
        this.render()
        this.setupEventListeners()
    }
    render() {
        const calculate = this.shadowDOM.querySelector("#calculate")
        calculate.innerHTML = "";
        calculate.innerHTML = `
        <h2 class="heading">BMI Calculator</h2>
         <div class="calculate-container">
        <!-- Gender -->
            <div class="gender">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15 3C15 2.44772 15.4477 2 16 2H20C21.1046 2 22 2.89543 22 4V8C22 8.55229 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V5.41288L15.4671 9.94579C15.4171 9.99582 15.363 10.0394 15.3061 10.0767C16.3674 11.4342 17 13.1432 17 15C17 19.4183 13.4183 23 9 23C4.58172 23 1 19.4183 1 15C1 10.5817 4.58172 7 9 7C10.8559 7 12.5642 7.63197 13.9214 8.69246C13.9587 8.63539 14.0024 8.58128 14.0525 8.53118L18.5836 4H16C15.4477 4 15 3.55228 15 3ZM9 20.9963C5.68831 20.9963 3.00365 18.3117 3.00365 15C3.00365 11.6883 5.68831 9.00365 9 9.00365C12.3117 9.00365 14.9963 11.6883 14.9963 15C14.9963 18.3117 12.3117 20.9963 9 20.9963Z" fill="#fcfcfc"></path> </g>
                </svg>
                <p>Male</p>
            </div>
            <div class="gender">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z" fill="#fcfcfc"></path> </g></svg>
                <p>Female</p>
            </div>
            <!-- Height -->
            <div class="height">
                <label>
                    Height(m)
                    <span class="display__height">1.5</span>
                    <input type="range" name="height" id="height" max="2.5" step="0.01">
                </label>
            </div>
            <!-- weight -->
            <div class="weight">
                <label>
                    Weight(kg)
                    <span class="weight__value"></span>
                    <input type="text" name="weight" id="weight" value=50>
                </label>
                <div class="svg__container">
                    <svg class="add" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fcfcfc"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#fcfcfc" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#fcfcfc" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg>

                    <svg class="minus" fill="#fcfcfc" viewBox="-3 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.711 9.182a1.03 1.03 0 0 1-1.03 1.03H1.319a1.03 1.03 0 1 1 0-2.059h10.364a1.03 1.03 0 0 1 1.029 1.03z"></path></g></svg>
                </div>
            </div>

            <!--  -->
            <div class="age">
                <label>
                    Age
                    <span class="age__value"></span>
                    <input type="text" name="age" id="age" value="18">
                </label>
                <div class="svg__container">
                    <svg class="add" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fcfcfc"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#fcfcfc" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#fcfcfc" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg>

                    <svg class="minus" fill="#fcfcfc" viewBox="-3 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.711 9.182a1.03 1.03 0 0 1-1.03 1.03H1.319a1.03 1.03 0 1 1 0-2.059h10.364a1.03 1.03 0 0 1 1.029 1.03z"></path></g></svg>
                </div>
            </div>
            <button class="btn">Calculate</button>
            </div>
        `
    }
    setupEventListeners() {
        //calculate bmi
        const calculateBtn = this.shadowDOM.querySelector('.btn');
        const height = this.shadowDOM.querySelector("#height")
        const heightValue = height.value;
        const weight = this.shadowDOM.querySelector("#weight")
        let weightValue = weight.value;
        const weightAdd = this.shadowDOM.querySelector(".weight .add")
        const weightMinus = this.shadowDOM.querySelector(".weight .minus")
        const ageAdd = this.shadowDOM.querySelector(".age .add")
        const ageMinus = this.shadowDOM.querySelector(".age .minus")


        calculateBtn.addEventListener("click", (event) => {
            event.preventDefault()
            const bmi = calculateBMI(weightValue, heightValue);
            proxiedResult.value = bmi;
            Router.go("#/result")
        });

        //update input values
        const displayHeight = this.shadowDOM.querySelector(".display__height");
        displayHeight.textContent = heightValue
        height.addEventListener("input", (event) => {
            displayHeight.textContent = event.target.value
        })

        //add weight value
        weightAdd.addEventListener("click", (event) => {
            let weight = this.shadowDOM.querySelector("#weight")
            weight.value = ++weight.value
        })

        //minus weight value
        weightMinus.addEventListener("click", (event) => {
            let weight = this.shadowDOM.querySelector("#weight")
            weight.value = --weight.value
        })

        //add age value
        ageAdd.addEventListener("click", (event) => {
            let age = this.shadowDOM.querySelector("#age")
            age.value = ++age.value
        })

        //minus age value
        ageMinus.addEventListener("click", (event) => {
            let age = this.shadowDOM.querySelector("#age")
            age.value = --age.value
        })

        //select gender
        const genderBtns = this.shadowDOM.querySelectorAll(".gender")
        
        genderBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                btn.classList.toggle("active")
            })
        })
    }
    
};
customElements.define("calculate-page", CalculatePage)