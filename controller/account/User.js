exports.index = async (req, res) => {
  let data = {};
  data.title = "User Settings";

  res.render("account/user/index", data);
};
