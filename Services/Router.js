import { CalculatePage } from "../Components/CalculatePage.js";
import { ResultPage } from "../Components/ResultPage.js";
export const Router = {
    init() {
        const links = document.querySelectorAll(".link");
        links.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault()
                const anchor = link.querySelector("a")
                const url = anchor.getAttribute("href")
                Router.go(url)
            })
        })
        window.addEventListener("popstate", (event) => {
            Router.go(event.state.route, false)
        })
    },
    go(route, addToHistory = true) {
        //update the browser history with a new route
        if (addToHistory) {
            history.pushState({route}, null, route)
        }
        //navigate to a given route and update the page content based on the route
        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement("calculate-page");
                break;
            case "/result":
                pageElement = document.createElement("result-page");
                break;
            case "/interpretation":
                pageElement = document.createElement("h1");
                pageElement.textContent = "Interpretation";
                break;
            default:
                pageElement = document.createElement("h1");
                pageElement.textContent = "404"
                break;
        }
        const main = document.querySelector("main");
        if (pageElement) {
           main.innerHTML = ""
            main.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        } else {
            main.textContent = "No page element found"
        }
    
    }
}