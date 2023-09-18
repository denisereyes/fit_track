export async function createUser(user = {}) {
    const url = '/user';
  
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  export async function findUser(username) {
  
    const url = `/user/${username}`
  
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', 
      mode: 'cors', // no-cors, *cors, same-origin
    });
  
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  export async function updateUser(username, data = {}) {
  
    const url = `/user/${username}`
  
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  
  export async function usernameAvailable(username) {
  
    if (username === '') {
      return false
    }
  
    const url = `/user/${username}/taken`
  
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    const data = await response.json();
  
    if (data.error) {
      return true;
    }
  
    return false;
  }
  
  export async function login(username, password) {
  
    const url = '/login';
    const request = {
      "data": {
        "username": username,
        "password": password
      }
    }
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    return response.json();
  }
  
  export async function checkLogin() {
  
    const url = '/login';
  
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
    });
  
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  export async function logout() {
  
    const url = '/logout';
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
    });
  
    return await response.json();
  }
  
  export async function addWeight(username, kilograms) {
  
    const url = `/user/${username}/weight`
  
    const request = {
      "data": {
        "kilograms": kilograms
      }
    }
  
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
  
    return response.json()
  }
  
  export async function updateCalories(username, amount) {
  
    const url = `/user/${username}/calories`
  
    const request = {
      "data": {
        "amount": amount
      }
    }
  
  
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
  
    return response.json()
  }
  