// Define API key and URL for fetching exchange rates
const apiKey = 'Your_API_KEY'; // API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`; // API URL

// Select HTML elements for interaction
const fromCurrency = document.querySelector("#from");
const toCurrency = document.querySelector("#to");
const result = document.querySelector("#result");
const history = document.querySelector("#history");
const btn = document.getElementById("convert-btn");
const reverseBtn = document.getElementById("reverse-btn");
const refreshRatesBtn = document.getElementById("refresh-rates-btn");

// Event listener for the convert button
btn.onclick = () => {
    const numberInputField = document.getElementById("amount");
    const userEnteredAmount = numberInputField.value;

    // Validate the user input
    if (userEnteredAmount < 1 || isNaN(userEnteredAmount)) {
	numberInputField.style.border = "1px solid red";
        result.style.color = "red";
        result.textContent = "Error: Only numeric values greater than 0 are allowed.";
    } else {
        numberInputField.style.border = "1px solid gray";
        result.style.color = "black";
        btn.textContent = "Processing";
        btn.disabled = true;
        btn.style.color = "gray";
        btn.style.cursor = "not-allowed";
        convertAmount(userEnteredAmount);
    }
};

// Event listener for the reverse button
reverseBtn.onclick = () => {
	const tempValue = fromCurrency.value;
	fromCurrency.value = toCurrency.value;
    	toCurrency.value = tempValue;
};

// Event listener for the refresh rates button
refreshRatesBtn.onclick = async () => {
    try {
        const data = await fetchData(apiUrl);
        console.log('Exchange rates updated:', data.conversion_rates);
        alert('Exchange rates have been updated!');
    } catch (error) {
        console.error('Error updating exchange rates:', error);
    }
};

// Function to convert the currency amount using API data
async function convertAmount(amount) {
    	const data = await fetchData(apiUrl);
    	const fromRates = data.conversion_rates[fromCurrency.value];
    	const toRates = data.conversion_rates[toCurrency.value];

    // Calculate direct conversion
    	const dRate = (toRates / fromRates).toFixed(4);
    	const dConvertedAmount = (amount * dRate).toFixed(4);

    // Indirect conversion to find a better rate via an intermediate currency
    	let bIntermediateCurrency = null;
    	let bConvertedAmount = parseFloat(dConvertedAmount);
    	let bIntermediateConvertedAmount = 0;
    	let bRoute = 'Direct is the best way';

    for (let iCurrency in data.conversion_rates) {
        if (iCurrency !== fromCurrency.value && iCurrency !== toCurrency.value) {
        	const iRate = data.conversion_rates[iCurrency];
            	const iiAmount = (amount * (iRate / fromRates)).toFixed(4); 	// Converted initial currency to intermediate currency
            	const iAmount = (iiAmount * (toRates / iRate)).toFixed(4); 	// Converted Intermediate currency to final currency

            	if (parseFloat(iAmount) > bConvertedAmount) {
                	bConvertedAmount = parseFloat(iAmount);
                	bIntermediateConvertedAmount = iiAmount;
                	bIntermediateCurrency = iCurrency;
                	bRoute = `Indirect (via ${iCurrency}): ${amount} ${fromCurrency.value} = ${bIntermediateConvertedAmount} ${bIntermediateCurrency} = ${bConvertedAmount} ${toCurrency.value}`;
            	}
        }
    }

    // Display conversion results
    	result.style.color = "black";
    	result.innerHTML = `
        <div>Direct: ${amount} ${fromCurrency.value} = ${dConvertedAmount} ${toCurrency.value}</div>
        <div>${bRoute}</div>
    `;

    	addToHistory(amount, fromCurrency.value, toCurrency.value, dConvertedAmount, bIntermediateCurrency, bIntermediateConvertedAmount, bConvertedAmount);

    // Reset button state
    	btn.disabled = false;
    	btn.style.color = "black";
    	btn.style.cursor = "pointer";
    	btn.textContent = "Convert";
}

// Function to add the conversion result to history
function addToHistory(amount, fromCurrency, toCurrency, dConvertedAmount, bIntermediateCurrency, bIntermediateConvertedAmount, bConvertedAmount) {
    	const historyItem = document.createElement("div");
    	historyItem.className = "history-item";
    	historyItem.innerHTML = `
        <div>Direct: ${amount} ${fromCurrency} = ${dConvertedAmount} ${toCurrency}</div>
        <div>Indirect (via ${bIntermediateCurrency}): ${amount} ${fromCurrency} = ${bIntermediateConvertedAmount} ${bIntermediateCurrency} = ${bConvertedAmount} ${toCurrency}</div>
    `;
    	history.appendChild(historyItem);
}

// Function to fetch data from the API
async function fetchData(url) {
    	try {
        	const response = await fetch(url);
        	if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        	const data = await response.json();
        	return data;
    	} catch (error) {
        	console.error('Fetch API Error:', error);
        	result.style.color = "red";
        	result.textContent = `An error occurred while fetching the data. Please try again later.`;
        	throw error;
    	}
}
