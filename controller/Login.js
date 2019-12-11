exports.index = (req, res) => {
  let data = {};
  data.title = "Login";

  res.render("login/index", data);
};
