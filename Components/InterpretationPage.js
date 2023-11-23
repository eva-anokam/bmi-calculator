
export class InterpretationPage extends HTMLElement {
    constructor() {
        super()

        //define shadowDOM
        this.shadowDOM = this.attachShadow({ mode: "open" })
        
        const styles = document.createElement("style")
        this.shadowDOM.appendChild(styles)

        async function loadCss() {
            const req = await fetch("../bmi-calculator/Components/InterpretationPage.css")
            const css = await req.text()
            styles.textContent = css
        }
        loadCss()
        
    }
    //define how the template will be rendered
    connectedCallback() {
        const template = document.getElementById("interpretation-page-template");

        if (template) {
            const content = template.content.cloneNode(true)
            this.shadowDOM.appendChild(content)
        } else {
            console.error("Interpretation template not found")
        }
        this.render()
    }
    render() {
        const interpretation = this.shadowDOM.querySelector("#interpretation")
        interpretation.innerHTML = "";
        interpretation.innerHTML = `
            <div>
                <h2>Body Mass Index (BMI) Categories</h2>

                <h3>For Adults:</h3>
                <ul>
                    <li>Severe Thinness: &lt; 16 (kg/m<sup>2</sup>)</li>
                    <li>Moderate Thinness: 16 - 17 (kg/m<sup>2</sup>)</li>
                    <li>Mild Thinness: 17 - 18.5 (kg/m<sup>2</sup>)</li>
                    <li>Normal: 18.5 - 25 (kg/m<sup>2</sup>)</li>
                    <li>Overweight: 25 - 30 (kg/m<sup>2</sup>)</li>
                    <li>Obese Class I: 30 - 35 (kg/m<sup>2</sup>)</li>
                    <li>Obese Class II: 35 - 40 (kg/m<sup>2</sup>)</li>
                    <li>Obese Class III: &gt; 40 (kg/m<sup>2</sup>)</li>
                </ul>

                <h3>For Children and Teens:</h3>
                <ul>
                    <li>Underweight: &lt;5% percentile</li>
                    <li>Healthy weight: 5% - 85% percentile</li>
                    <li>At risk of overweight: 85% - 95% percentile</li>
                    <li>Overweight: &gt;95% percentile</li>
                </ul>
                <a href="https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm" target= _blank>Learn more</a>
            </div>

        `
    }
}
customElements.define("interpretation-page", InterpretationPage)