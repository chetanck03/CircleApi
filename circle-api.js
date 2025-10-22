const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.CIRCLE_API_KEY;
const BASE_URL = process.env.CIRCLE_BASE_URL || 'https://api-sandbox.circle.com';
const WALLET_ID = process.env.WALLET_ID;

// Generate unique ID for each request
function generateId() {
  return `mint-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Mint tokens using Circle API
async function mintToken(amount, currency = 'USDC') {
  try {
    const response = await axios.post(`${BASE_URL}/v1/businessAccount/transfers`, {
      idempotencyKey: generateId(),
      source: {
        type: 'wallet',
        id: WALLET_ID
      },
      destination: {
        type: 'blockchain',
        address: WALLET_ID,
        chain: 'ETH'
      },
      amount: {
        amount: amount.toString(),
        currency: currency
      }
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      success: true,
      transactionId: response.data.data?.id,
      amount: amount,
      currency: currency
    };
  } catch (error) {
    console.error('Error minting token:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
}

// Get wallet balance from Circle API
async function getWalletBalance() {
  try {
    const response = await axios.get(`${BASE_URL}/v1/wallets/${WALLET_ID}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      success: true,
      balance: response.data.data?.balances || []
    };
  } catch (error) {
    console.error('Error getting wallet balance:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
}

module.exports = {
  mintToken,
  getWalletBalance
};