import AuthService from '../utils/AuthService';
const auth = new AuthService('dBLJpCZvLmQEoD0uoXmRMTby8F2b7ju1', 'tchaffee.auth0.com');

function getProfile () {
  return auth.fetch('/api/users/me',
    {
      method: 'GET'     
    }
  )
  .then(response => {
    return response.json();
  });
}


function updateProfile (name, city, state) {
  return auth.fetch('/api/users/me',
    {
      method: 'PUT',
 	    body: JSON.stringify({
		    name: name,
        city: city,
        state: state
	    })     
    }
  )
  .then(response => {
    return response;
  });
}

export { getProfile, updateProfile };
