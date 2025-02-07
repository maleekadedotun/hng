// Importing required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors());

// Helper function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Helper function to check if a number is a perfect number
function isPerfect(num) {
    let sum = 0;
    for (let i = 1; i <= num / 2; i++) {
        if (num % i === 0) {
            sum += i;
        }
    }
    return sum === num;
}

// Helper function to check if a number is Armstrong
function isArmstrong(num) {
    const digits = num.toString().split('');
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), digits.length), 0);
    return sum === num;
}

// Helper function to get the sum of digits
function getDigitSum(num) {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

// app.get("/", (req, res) =>{
//    try {
   
//     res.json("Working successsfully")
//    } catch (error) {
//     res.json({
//         error: error,
//         status: 400,
//     })
//    }
    
// })

// API endpoint to classify numberss
app.get('/api/classify-number', async (req, res) => {
    const { number } = req.query;

    // Check if the input is a valid integer
    if (!number || isNaN(number) || !Number.isInteger(parseFloat(number))) {
        return res.status(400).json({
            number: req.query.number,
            error: true,
        });
    }

    const num = parseInt(number);
    
    // Gather the properties
    const properties = [];
    if (isArmstrong(num)) properties.push('armstrong');
    if (num % 2 !== 0) properties.push('odd');
    if (isPerfect(num)) properties.push('perfect');

    // Fetch fun fact from Numbers API
    let funFact = '';
    try {
        const response = await axios.get(`http://numbersapi.com/${num}?json`);
        funFact = response.data.text;
    } catch (err) {
        funFact = 'No fun fact available for this number.';
    }

    // Prepare response
    const result = {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties: properties,
        digit_sum: getDigitSum(num),
        fun_fact: funFact,
    };

    res.json(result).status(200);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
