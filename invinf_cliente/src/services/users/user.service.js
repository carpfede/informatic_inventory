class userService {
  axios;
  lodash;
  baseUrl;
  constructor(axios, baseUrl, lodash) {
    this.axios = axios;
    this.lodash = lodash;
    this.baseUrl = baseUrl;
  }

  async logIn(user, pass) {
    const log = {
      username: user,
      pass: pass,
    };

    const response = await this.axios.post(`${this.baseUrl}users/login`, log);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response;
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default userService;