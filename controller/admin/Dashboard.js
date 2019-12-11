exports.index = (req, res) => {
  let data = {};
  data.title = "Admin Dashboard Home Page";

  res.render("admin/dashboard/index", data);
};
