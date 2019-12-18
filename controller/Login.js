const Client = require("../model/Client");


exports.index = (req, res) => {
  let data = {};
  data.title = "Login";

  res.render("login/index", data);
};



exports.process = (req, res) =>{
  let username = req.body.username; 
  let password = req.body.password; 

  let client = new Client(); 
  client.login({username:username, password:password}).then((clientId)=>{

    req.session.accountLoggedIn = true; 
    req.session.clientId = clientId; 
    console.log("my userid is " + clientId); 

    console.log("req session"); 
    console.log(req.session); 

    res.json({
      status:1,
      message:"Logged in successfully!"
    }); 
  })
  .catch((err)=>{

    console.log("Error " + err); 

    res.json({
      status:0, 
      message:"Wrong Username or Password!"
    }); 
  });

}
