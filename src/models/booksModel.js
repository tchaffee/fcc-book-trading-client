import AuthService from '../utils/AuthService';
const auth = new AuthService('dBLJpCZvLmQEoD0uoXmRMTby8F2b7ju1', 'tchaffee.auth0.com');

function getAllBooks () {
  return auth.fetch('/api/books',
    {
      method: 'GET'
    }
  )
  .then(response => {
    return response.json();
  });
}

function getMyBooks () {
  return auth.fetch('/api/users/me/books',
    {
      method: 'GET'
    }
  )
  .then(response => {
    return response.json();
  });
}

function addBook (googleId, title) {
  return auth.fetch('/api/users/me/books',
    {
      method: 'POST',
 	    body: JSON.stringify({
		    googleId: googleId,
        title: title
	    })     
    }
  )
  .then(response => {
    return response;
  });
}

function deleteBook (googleId) {
  return auth.fetch('/api/users/me/books',
    {
      method: 'DELETE',
 	    body: JSON.stringify({
		    googleId: googleId
	    })     
    }
  )
  .then(response => {
    return response;
  });
}

// Gets other users' trade requests for me. I.e. books other people requested from me.
function getTradesForMe () {
  return auth.fetch('/api/traderequests?owner=me',
    {
      method: 'GET'
    }
  )
  .then(response => {
    return response.json();
  });
}


// Gets my trade requests. I.e. stuff I requested to trade.
function getMyTrades () {
  return auth.fetch('/api/users/me/traderequests',
    {
      method: 'GET'
    }
  )
  .then(response => {
    return response.json();
  });
}

// Creates a new trade request
function tradeBook (owner, googleId) {
  return auth.fetch('/api/users/me/traderequests',
    {
      method: 'POST',
 	    body: JSON.stringify({
        owner: owner,
		    googleId: googleId
	    })     
    }
  )
  .then(response => {
    return response;
  });
}

// Approves a trade request
function approveTradeRequest (googleId) {
  return auth.fetch('/api/users/me/traderequests',
    {
      method: 'POST',
 	    body: JSON.stringify({
        action: 'approve',
		    googleId: googleId
	    })     
    }
  )
  .then(response => {
    return response;
  });
}

export { getAllBooks, getMyBooks, addBook, deleteBook, tradeBook, getMyTrades, getTradesForMe,  approveTradeRequest };
