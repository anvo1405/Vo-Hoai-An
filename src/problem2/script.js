document.addEventListener("DOMContentLoaded", function () {
    const inputCurrencySelect = document.getElementById('input-currency');
    const outputCurrencySelect = document.getElementById('output-currency');
    const inputAmount = document.getElementById('input-amount');
    const outputAmount = document.getElementById('output-amount');

    const inputCurrencyImg = document.getElementById('input-currency-img');
    const outputCurrencyImg = document.getElementById('output-currency-img');

    const inputError = document.getElementById('input-error');
    const outputError = document.getElementById('output-error');

    const inputContainer = inputAmount.closest('.input-select-container');
    const outputContainer = outputAmount.closest('.input-select-container');

    let pricesData = {};
    let lastEdited = 'input'; 
    let debounceTimeout;

    fetch("https://interview.switcheo.com/prices.json")
        .then(response => response.json())
        .then(data => {
            pricesData = data;
            const currencies = [...new Set(pricesData.map(item => item.currency))];

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                inputCurrencySelect.appendChild(option1);
                
                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                outputCurrencySelect.appendChild(option2);
            });

            setCurrencyImage(inputCurrencySelect.value, inputCurrencyImg);
            setCurrencyImage(outputCurrencySelect.value, outputCurrencyImg);
        })
        .catch(error => console.error("Error fetching data:", error));

    function setCurrencyImage(currency, element) {
        element.src = `assets/tokens/${currency}.svg`;
        element.alt = `${currency} image`;
    }

    function validateInput(amount, errorElement, container) {
        if (isNaN(amount) || amount <= 0) {
            errorElement.textContent = "Please enter a valid positive number";
            container.classList.add('error');
            return false;
        }
        errorElement.textContent = "";
        container.classList.remove('error');
        return true;
    }

    function convertCurrency() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const inputCurrency = inputCurrencySelect.value;
            const outputCurrency = outputCurrencySelect.value;

            let fromAmount = lastEdited === 'input' ? parseFloat(inputAmount.value) : parseFloat(outputAmount.value);
            let errorElement = lastEdited === 'input' ? inputError : outputError;
            let container = lastEdited === 'input' ? inputContainer : outputContainer;

            if (!validateInput(fromAmount, errorElement, container)) return;

            const inputPrice = pricesData.find(item => item.currency === inputCurrency)?.price;
            const outputPrice = pricesData.find(item => item.currency === outputCurrency)?.price;

            if (inputPrice && outputPrice) {
                const convertedAmount = lastEdited === 'input' 
                    ? (fromAmount * inputPrice) / outputPrice 
                    : (fromAmount * outputPrice) / inputPrice;

                if (lastEdited === 'input') outputAmount.value = convertedAmount.toFixed(2);
                else inputAmount.value = convertedAmount.toFixed(2);
            }

            // Kiểm tra và xóa class error nếu giá trị đã hợp lệ
            validateInput(parseFloat(inputAmount.value), inputError, inputContainer);
            validateInput(parseFloat(outputAmount.value), outputError, outputContainer);
        }, 500);
    }

    inputAmount.addEventListener('input', () => {
        lastEdited = 'input';
        convertCurrency();
    });

    outputAmount.addEventListener('input', () => {
        lastEdited = 'output';
        convertCurrency();
    });

    inputCurrencySelect.addEventListener('change', () => {
        setCurrencyImage(inputCurrencySelect.value, inputCurrencyImg);
        convertCurrency();
    });

    outputCurrencySelect.addEventListener('change', () => {
        setCurrencyImage(outputCurrencySelect.value, outputCurrencyImg);
        convertCurrency();
    });
});
