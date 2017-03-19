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

export { getAllBooks };
