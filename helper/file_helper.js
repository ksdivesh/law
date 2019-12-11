const fileUpload = require("express-fileupload");

const uploadFile = req => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return false;
  }

  let sampleFile = req.files.sampleFile;
};
