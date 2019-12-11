exports.index = (req, res) => {
  let data = {};
  data.title = "Register";

  res.render("register/index", data);
};
