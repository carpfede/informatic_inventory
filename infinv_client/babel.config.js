module.exports = {
  presets: ["@vue/app"],
  externals: {
    config: JSON.stringify({
      apiUrl: "http://localhost:4000"
    })
  }
};
