import AuthService from '../utils/AuthService';
const auth = new AuthService('dBLJpCZvLmQEoD0uoXmRMTby8F2b7ju1', 'tchaffee.auth0.com');

function getAllBooks () {
  return fetch('/api/books/',
    {
      method: 'GET'
    }
  )
  .then(response => {
    return response.json();
  });
}

function getMyBooks () {
  return auth.fetch('/api/users/me/books/',
    {
      method: 'GET'
    }
  )
  .then(response => {
    return response.json();
  });
}

// TODO: Need to add body, eh?
function addBook (bookName) {
  return auth.fetch('/api/users/me/books/',
    {
      method: 'POST',
 	    body: JSON.stringify({
		    bookName: bookName
	    })     
    }
  )
  .then(response => {
    return response.json();
  });
}

export { getAllBooks, getMyBooks };
