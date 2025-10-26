# Currency Converter

[![License: GPL v2](https://img.shields.io/badge/License-GPLv2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
[![Build and Push Docker Image](https://github.com/VatshVan/Currency_Converter/actions/workflows/docker-image.yml/badge.svg)](https://github.com/VatshVan/Currency_Converter/actions/workflows/docker-image.yml)
[![GitHub Pages](https://img.shields.io/github/deployments/VatshVan/Currency_Converter/github-pages?label=GitHub%20Pages)](https://vatshvan.github.io/Currency_Converter/)

This is a simple currency converter web application that allows users to convert amounts from one currency to another using real-time exchange rates fetched from an API.

## Live Demo 🚀

This project is deployed using GitHub Pages.

**You can access the live version here: [https://vatshvan.github.io/Currency_Converter/](https://vatshvan.github.io/Currency_Converter/)**
*(Note: You may need to rename `converter.html` to `index.html` for the link to work)*

## Features

- Convert currency amounts between various currencies using real-time exchange rates.
- Reverse currency conversion with a single button click.
- Refresh exchange rates to get the latest values.
- View conversion history with both direct and indirect conversion paths.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **API:** Exchange Rate API for real-time currency exchange rates.
- **Deployment:** GitHub Pages
- **Containerization:** Docker

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
│       ├── static.yml      # GitHub Pages deployment
│       └── docker-image.yml # Docker build/push
├── index.html        (or converter.html)
├── style.css
├── javascript.js
├── Dockerfile        # Container definition
├── .dockerignore     # Files to ignore in Docker build
├── LICENSE           # MIT License
└── README.md
