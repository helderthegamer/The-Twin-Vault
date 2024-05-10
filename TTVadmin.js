$( document ).ready(function() {
    console.log( "ready!" );
    key.forEach(key => {
        getDataFromServer(token, key);
    });
});

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

function changePrice(id, action) {
    var priceElem = document.getElementById(id);
    var currentPrice = parseFloat(priceElem.textContent.replace('Price: ', '').replace(' CHF', ''));
    var newPrice;

    if (isNaN(currentPrice) || currentPrice === 0.00) {
        currentPrice = 1.00; // Set to 1.00 if it's NaN or 0.00
    }

    if (action === 'increase') {
        newPrice = currentPrice + 0.10;
    } else if (action === 'decrease') {
        if (currentPrice != 0.00) {
            newPrice = currentPrice - 0.10;
        }
    }

    priceElem.textContent = 'Price: ' + newPrice.toFixed(2) + ' CHF';
    setDataToServer(token, id, newPrice.toFixed(2).toString());
}

function changeAmount(id, action) {
    var amountElem = document.getElementById(id);
    var currentAmount;

    // Check if the inner HTML is "Amount: Loading..." or "NaN"
    if (amountElem.textContent.trim() === 'Amount: Loading...' || isNaN(parseInt(amountElem.textContent.replace('Amount: ', '')))) {
        currentAmount = 1; // Set currentAmount to 1 if it's loading or NaN
    } else {
        currentAmount = parseInt(amountElem.textContent.replace('Amount: ', ''));
    }

    var newAmount;

    if (action === 'increase') {
        newAmount = currentAmount + 1;
    } else if (action === 'decrease') {
        if (currentAmount != 0) {
            newAmount = currentAmount - 1;
        } else {
            // If currentAmount is already 0, do not decrease further
            newAmount = 0;
        }
    }

    amountElem.textContent = 'Amount: ' + newAmount;
    setDataToServer(token, id, newAmount.toString());
}

//Datalyzer API

// Function to set data to the server
async function setDataToServer(token, key, value) {
    const url = `https://datalyzer.ch/keyapi/${token}/${key}/${value}`;
    const response = await fetch(url, {
        method: 'POST'
    });
    if (response.ok) {
        console.log(`Data successfully set for key "${key}": "${value}"`);
    } else {
        console.error(`Failed to set data for key "${key}"`);
    }
}

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



//Important!

const token = 'q2umr-vv3or-nwztm-dsgh8';
const key = ['price1', 'amount1', 'price2', 'amount2', 'price3', 'amount3', 'price4', 'amount4', ];
