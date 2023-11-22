import { Router } from "./Router.js"
export function calculateFirst() {
        const calculateFirst = document.querySelector(".calculate-first")
        calculateFirst.addEventListener("click", (event) => {
            event.preventDefault()
            Router.go("#/calculate")
        })
}