export class ResultPage extends HTMLElement {
    constructor() {
        super();

        //create and attach the shadowDOM
        this.shadowDOM = this.attachShadow({ mode: "open" });

        //load css
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

        //add possible proxy
        this.render();
        window.addEventListener("resultchange", () => {
        });
    }
    render() {
        const result = this.shadowDOM.querySelector("#result");
        result.innerHTML = "";
        result.innerHTML = `
             <h2>Your result</h2>
            <div class="result-container">
                <p>400</p>
                <a href="#">See the interpretation</a>
            </div>
            <a href="#">Re-calculate</a>
        `;
    }
}
customElements.define("result-page", ResultPage)
