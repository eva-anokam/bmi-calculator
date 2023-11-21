let result = {
    value: null
}

const proxiedResult = new Proxy(result, {
    set(target, property, value) {
        //update the property value
        target[property] = value;

        //announce result change by sending out a custom event
        window.dispatchEvent(new Event("resultchange"))

        return true;
    }
})
export default proxiedResult