# The Headless Warehouse API

A high-performance, protocol-compliant inventory management system built with Node.js and MongoDB. This project focuses on REST semantics and HTTP standards to provide a headless service capable of serving web apps, mobile platforms, and AI agents.

## Key Technical Features

* Engineered a multi-format response system for JSON and CSV delivery via advanced content negotiation.
* Optimized network efficiency by caching using redis.
* Enforced strict REST semantics using idempotent update patterns 


## Tech Stack

* Backend: Node.js, Express.js
* Database: MongoDB (Mongoose)
* Operating System: Fedora Linux
* Testing: Postman

## Installation & Setup

1. Clone the repository:
   `git clone https://github.com/yourusername/headless-warehouse.git`

2. Install dependencies:
   `npm install`

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add:
   `PORT=3000`
   `MONGO_URI=your_mongodb_connection_string`

4. Start the server:
   `npm start`

## API Features & Testing

### 1. Content Negotiation (JSON/CSV)
The API detects the `Accept` header to format the response.
* For JSON: Set `Accept: application/json`
* For CSV: Set `Accept: text/csv`



---
License: MIT
