# CROWDFUNDING PLATFORM

Created using MERN Stack 

## Installation

```
npm install

```

### Configure .env file

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_jwt_secret_here
CASHFREE_CLIENT_ID=your_cashfree_client_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key

```

## Features

- [x] Register/Login functionality using JWT
- [x] Role-based access: login as Fundraiser or Contributor
- [x] Fundraisers can:
- [x] Create fundraising campaigns with title, description, target amount, category, and image
- [x] View/manage their created campaigns
- [x] Contributors can:
- [x] Explore all listed campaigns
- [x] Filter by category
- [x] Donate securely using Cashfree Payment Gateway
- [x] Live donation tracking
- [x] Search campaigns using keywords
- [x] Clean and responsive UI dashboard for both user types

