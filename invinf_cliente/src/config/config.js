const config =
{
  baseUrl: "http://localhost:3000/",
  rules: {
    required: value => !!value || "Requerido.",
    email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "E-mail invalido.";
    },
    maxLength: value => value.length <= 25 || "Max 25 caracteres.",
    onlyNumbers: value => {
      const pattern = /^(0|[1-9][0-9]*)$/;
      return pattern.test(value) || "Solo números."
    }
  }
};

export default config;
