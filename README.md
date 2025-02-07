A simple REST API built with Node.js and Express to classify numbers based on various mathematical properties such as prime, perfect, Armstrong, odd, and even. The API also fetches fun facts about the number from Numbers API.

Features
Classify numbers based on properties:
Prime
Perfect
Armstrong
Odd / Even
Return the sum of digits of the number.
Fetch a fun fact about the number using the Numbers API.
Handle CORS (Cross-Origin Resource Sharing) for frontend applications.
API Endpoint
GET /api/classify-number?number=<number>
Request Parameters:
number (required): A valid integer to classify.
Response Format:
200 OK - Successful response with the number properties.
{
  "number": <number>,
  "is_prime": <boolean>,
  "is_perfect": <boolean>,
  "properties": ["<property1>", "<property2>", ...],
  "digit_sum": <digit_sum>,
  "fun_fact": "<fun_fact>"
}
