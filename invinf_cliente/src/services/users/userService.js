class userService {
  axios;
  lodash;
  baseUrl;
  constructor(axios, config, lodash) {
    this.axios = axios;
    this.lodash = lodash;
    this.baseUrl = config.baseUrl;
  }

  async singIn() {
    //let tt = await this.axios.get(`${this.baseUrl}auth`).then(response => this.tt = response);
    let employee = {
      "firstName": "fede",
      "lastName": "fede",
      "email": "fede@hotmail.com",
      "idNumber": 1234
    }
    let tt = await this.axios.post(`${this.baseUrl}employees/create`, employee);

    // eslint-disable-next-line no-console
    console.log(tt);

    if (this.lodash.size(tt.data.errors) > 0)
      return;

    const createdEmployee = tt.data.employee;

    // eslint-disable-next-line no-console
    console.log(createdEmployee)
    const user = {
      "userName": employee.idNumber,
      "password": 'default123456',
      "employee": createdEmployee
    }

    let t = await this.axios.post(`${this.baseUrl}users/create`, user);

    // eslint-disable-next-line no-console
    console.log('hola', tt);
    // eslint-disable-next-line no-console
    console.log('hola', t);

  }
}

export default userService;

// export const userService = {
//   login,
//   logout,
//   register,
//   getAll,
//   getById,
//   update,
//   delete: _delete
// };

// async function login(username, password) {
//   console.log(username);
//   console.log(password);
//   // const requestOptions = {
//   //   method: "POST",
//   //   headers: { "Content-Type": "application/json" },
//   //   body: JSON.stringify({ username, password })
//   // };

//   // const response = await fetch(
//   //   `${config.apiUrl}/users/authenticate`,
//   //   requestOptions
//   // );
//   // const user = await handleResponse(response);
//   // // login successful if there's a jwt token in the response
//   // if (user.token) {
//   //   // store user details and jwt token in local storage to keep user logged in between page refreshes
//   //   localStorage.setItem("user", JSON.stringify(user));
//   // }
//   // return user;
// }

// function logout() {
//   // remove user from local storage to log user out
//   localStorage.removeItem("user");
// }

// async function register(user) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user)
//   };

//   const response = await fetch(
//     `${config.apiUrl}/users/register`,
//     requestOptions
//   );
//   return handleResponse(response);
// }

// async function getAll() {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader()
//   };

//   const response = await fetch(`${config.apiUrl}/users`, requestOptions);
//   return handleResponse(response);
// }

// async function getById(id) {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader()
//   };

//   const response = await fetch(`${config.apiUrl}/users/${id}`, requestOptions);
//   return handleResponse(response);
// }

// async function update(user) {
//   const requestOptions = {
//     method: "PUT",
//     headers: { ...authHeader(), "Content-Type": "application/json" },
//     body: JSON.stringify(user)
//   };

//   const response = await fetch(
//     `${config.apiUrl}/users/${user.id}`,
//     requestOptions
//   );
//   return handleResponse(response);
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// async function _delete(id) {
//   const requestOptions = {
//     method: "DELETE",
//     headers: authHeader()
//   };

//   const response = await fetch(`${config.apiUrl}/users/${id}`, requestOptions);
//   return handleResponse(response);
// }

// function handleResponse(response) {
//   return response.text().then(text => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         logout();
//         location.reload(true);
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }
