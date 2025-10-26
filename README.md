# Currency Converter

[![License: GPL v2](https://img.shields.io/badge/License-GPLv2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
[![Build and Push Docker Image](https://github.com/VatshVan/Currency_Converter/actions/workflows/docker-image.yml/badge.svg)](https://github.com/VatshVan/Currency_Converter/actions/workflows/docker-image.yml)
[![GitHub Pages](https://img.shields.io/github/deployments/VatshVan/Currency_Converter/github-pages?label=GitHub%20Pages)](https://vatshvan.github.io/Currency_Converter/)
[![GitHub release](https://img.shields.io/github/v/release/VatshVan/Currency_Converter.svg)](https://github.com/VatshVan/Currency_Converter/releases)

This is a simple currency converter web application that allows users to convert amounts from one currency to another using real-time exchange rates fetched from an API.

## Live Demo 🚀

This project is deployed using GitHub Pages.

**You can access the live version here: [https://vatshvan.github.io/Currency_Converter/](https://vatshvan.github.io/Currency_Converter/)**

*(Note: The live demo uses a built-in API key. If you fork or clone this project, you will need to add your own key as described below.)*

## Features

- Convert currency amounts between various currencies using real-time exchange rates.
- Reverse currency conversion with a single button click.
- Refresh exchange rates to get the latest values.
- View conversion history with both direct and indirect conversion paths.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **API:** [ExchangeRate-API](https://www.exchangerate-api.com/)
- **Deployment:** GitHub Pages
- **Containerization:** Docker

## Configuration (Required for Local Use) 🔑

This project requires a free API key to fetch exchange rates.

1.  Go to [https://www.exchangerate-api.com/](https://www.exchangerate-api.com/) and sign up for a free API key.
2.  Open the `javascript.js` file in the repository.
3.  Find the following line:
    ```javascript
    const apiKey = 'Your_API_KEY'; // API key
    ```
4.  Replace `'Your_API_KEY'` with the actual API key you received.

## How to Use (Web Interface)

1.  Enter the amount you want to convert.
2.  Select the source currency from the "FROM" dropdown.
3.  Select the target currency from the "TO" dropdown.
4.  Click the "Convert" button to perform the conversion.
5.  The result will be displayed in the "Result" section.
6.  You can view the conversion history in the "Conversion History" section.
7.  Use the "Reverse" button to switch the source and target currencies.
8.  Use the "Refresh Rates" button to update the exchange rates.

## How to Run Locally (with Docker 🐳)

You can easily run this application locally using Docker.

**Note:** Before building the Docker image, you must complete the **Configuration** steps above and add your API key to the `javascript.js` file.

1.  **Build the Docker image:**
    ```bash
    docker build -t currency-converter .
    ```

2.  **Run the Docker container:**
    ```bash
    docker run -p 8080:80 currency-converter
    ```

3.  Open your browser and go to `http://localhost:8080` to see the app.

## File Structure

```plaintext
currency-converter/
├── .github/
│   └── workflows/
│       ├── static.yml       # GitHub Pages deployment
│       └── docker-image.yml # Docker build/push
├── index.html
├── style.css
├── javascript.js
├── Dockerfile        # Container definition
├── .dockerignore     # Files to ignore in Docker build
├── LICENSE           # GNU License
└── README.md
