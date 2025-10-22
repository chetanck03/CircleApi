# Circle Token Minter

A basic application to mint tokens using Circle API and display them in a wallet interface.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` and add your Circle API credentials:
   ```
   CIRCLE_API_KEY=your_actual_api_key
   CIRCLE_BASE_URL=https://api-sandbox.circle.com
   WALLET_ID=your_wallet_id
   ```

3. **Run the application:**
   ```bash
   npm start
   ```

## Features

- ✅ Mint tokens using Circle API
- ✅ Display wallet balance and token history
- ✅ Track minting transactions
- ✅ Fetch live balance from Circle API

## API Endpoints Used

- `POST /v1/businessAccount/transfers` - Mint tokens
- `GET /v1/wallets/{walletId}` - Get wallet balance

## Files

- `index.js` - Main application entry point
- `circle-api.js` - Circle API integration
- `wallet.js` - Local wallet management
- `package.json` - Project dependencies

## Notes

- Uses Circle's sandbox environment by default
- Requires valid Circle API credentials
- Implements proper error handling and logging