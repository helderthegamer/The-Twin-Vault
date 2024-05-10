$( document ).ready(function() {
    console.log( "ready!" );
    key.forEach(key => {
        getDataFromServer(token, key);
    });
});

// Function to get data from the server
async function getDataFromServer(token, key) {
    const url = `https://datalyzer.ch/keyapi/${token}/${key}`;
    const response = await fetch(url, {
        method: 'GET'
    });
    if (response.ok) {
        const data = await response.json();
        console.log(`Retrieved data for key "${key}":`, data);
        // Add this line to debug
        console.log(`Data value for key "${key}":`, data.value);
        // Convert data value to a number
        data.value = parseFloat(data.value);
        console.log(data.value)
        updateProd(key, data);
        return data.value; // Returning the value retrieved from the server
    } else {
        console.error(`Failed to retrieve data for key "${key}"`);
        return null;
    }
}

const token = 'q2umr-vv3or-nwztm-dsgh8';
const key = ['price1', 'amount1', 'price2', 'amount2', 'price3', 'amount3', 'price4', 'amount4', ];


function updateProd(key, data) {
    // Extract the numeric part from the key
    const index = key.match(/\d+/)[0]; // Extracts the numeric part from the key
    const priceKey = `price${index}`;
    const amountKey = `amount${index}`;
    newData = Number(data.value)
    // Compare with the correct keys
    if (key === priceKey) {
        // Format the price with two decimal places
        const formattedPrice = newData.toFixed(2);
        $(`#price${index}`).text(`Price: ${formattedPrice} CHF`);
    } else if (key === amountKey) {
        $(`#amount${index}`).text(`Amount: ${newData}`);
    }
}