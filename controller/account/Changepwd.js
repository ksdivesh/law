exports.index = async (req, res) => {
  let data = {};
  data.title = "Change Password";

  res.render("account/changepwd/index", data);
};
