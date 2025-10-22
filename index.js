const { mintToken, getWalletBalance } = require('./circle-api');
const { addMintedToken, displayWallet } = require('./wallet');
require('dotenv').config();

async function main() {
  console.log('🚀 Starting Circle Token Minter...\n');
  
  // Check if API key is configured
  if (!process.env.CIRCLE_API_KEY) {
    console.error('❌ Error: CIRCLE_API_KEY not found in environment variables');
    console.log('Please copy .env.example to .env and add your Circle API credentials');
    return;
  }
  
  try {
    // Display initial wallet state
    console.log('📱 Initial Wallet State:');
    displayWallet();
    
    // Mint some tokens
    console.log('🪙 Minting tokens...');
    
    const amounts = [100, 50, 25];
    
    for (let i = 0; i < amounts.length; i++) {
      const amount = amounts[i];
      console.log(`Minting ${amount} USDC...`);
      
      const result = await mintToken(amount, 'USDC');
      
      if (result.success) {
        console.log(`✅ Mint ${i + 1}: Successfully minted ${result.amount} ${result.currency}`);
        addMintedToken(result);
      } else {
        console.log(`❌ Mint ${i + 1}: Failed - ${result.error}`);
      }
    }
    
    // Display updated wallet
    console.log('\n📱 Updated Wallet State:');
    displayWallet();
    
    // Get live balance from Circle API
    console.log('🔄 Fetching live balance from Circle API...');
    const balanceResult = await getWalletBalance();
    
    if (balanceResult.success) {
      console.log('💰 Live Circle Wallet Balance:');
      balanceResult.balance.forEach(balance => {
        console.log(`  ${balance.currency}: ${balance.amount}`);
      });
    } else {
      console.log(`❌ Failed to fetch live balance: ${balanceResult.error}`);
    }
    
  } catch (error) {
    console.error('❌ Application error:', error.message);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...');
  process.exit(0);
});

// Run the application
main().catch(console.error);