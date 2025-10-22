// Simple wallet storage
let tokens = [];
let transactions = [];

// Add minted token to wallet
function addMintedToken(tokenData) {
    const token = {
        id: tokenData.transactionId,
        amount: tokenData.amount,
        currency: tokenData.currency,
        mintedAt: new Date().toISOString(),
        status: 'minted'
    };

    tokens.push(token);
    transactions.push({
        type: 'mint',
        ...token
    });

    return token;
}

// Calculate total balance by currency
function getBalance() {
    const balanceMap = {};

    tokens.forEach(token => {
        if (!balanceMap[token.currency]) {
            balanceMap[token.currency] = 0;
        }
        balanceMap[token.currency] += parseFloat(token.amount);
    });

    return balanceMap;
}

// Get all tokens
function getTokens() {
    return tokens;
}

// Get transaction history
function getTransactionHistory() {
    return transactions.sort((a, b) => new Date(b.mintedAt) - new Date(a.mintedAt));
}

// Display wallet information
function displayWallet() {
    console.log('\n=== WALLET OVERVIEW ===');

    const balance = getBalance();
    console.log('\nCurrent Balance:');
    Object.entries(balance).forEach(([currency, amount]) => {
        console.log(`  ${currency}: ${amount.toFixed(2)}`);
    });

    console.log('\nRecent Tokens:');
    const recentTokens = tokens.slice(-5);
    if (recentTokens.length === 0) {
        console.log('  No tokens minted yet');
    } else {
        recentTokens.forEach(token => {
            console.log(`  ${token.amount} ${token.currency} - Minted: ${new Date(token.mintedAt).toLocaleString()}`);
        });
    }

    console.log('========================\n');
}

module.exports = {
    addMintedToken,
    getBalance,
    getTokens,
    getTransactionHistory,
    displayWallet
};