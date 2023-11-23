# BMI Calculator Project

This BMI (Body Mass Index) Calculator is a web application that allows users to calculate their BMI based on their height and weight. The project is implemented as a Single Page Application (SPA) using HTML, CSS, and JavaScript.

## Features

- **Calculate BMI:** Users can input their height and weight to calculate their BMI instantly.
- **Result Interpretation:** Provides a range interpretation based on BMI categories for both adults and children/teens.
- **Responsive Design:** The application is designed to work across various devices and screen sizes.

## Usage

To use the BMI Calculator:

1. Open `index.html` in a web browser.
2. Input your height and weight.
3. Click on the "Calculate" button to get your BMI.
4. View the BMI result and interpretation.

## Folder Structure

```
bmi-calculator/
│
├── Components/              # Contains custom web components and stylesheets(CalculatePage.js, ResultPage.js)
│
├── Services/                # Services and utilities (Calculate.js, Result.js)
│
│
├── index.html               # Main HTML file
├── app.js                # Main JavaScript file
└── ...
```


## Development and CSS Loading Issue
 ### Development
The BMI Calculator is developed as a Single Page Application (SPA) using vanilla HTML, CSS, and JavaScript. Custom web components were created to encapsulate specific functionalities. The Calculate Page (CalculatePage.js) manages user input for height and weight, and the Result Page (ResultPage.js) displays the calculated BMI result along with its interpretation.

### CSS Loading Issue
The CSS loading issue is encountered during the initial page load, causing a brief delay in applying styles. To mitigate this issue, the CSS files are preloaded using the preload attribute in the HTML <head> section. Despite this, a minor delay is observed on the first rendering of the page.

I am actively investigating this issue and working on optimizing the CSS loading process to ensure a seamless user experience.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



