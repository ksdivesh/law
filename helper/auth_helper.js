var Cookies = require("cookies"); 
var Client = require("../model/Client"); 

exports.clientAuth = async (req, res, next) => {
      console.log("In auth service");
      
      if(req.url.includes("/account")){
            console.log("account area");

            var keys = ['lawyer_auth']; 
            var cookies = new Cookies(req, res, {keys:keys}); 
            var clientSessionId = cookies.get("sessionId",{signed:true});
     
            console.log("Client session id  " + clientSessionId); 

            if(clientSessionId === undefined){
                  res.redirect("/login"); 
                  return false; 
            }

            var client = new Client(); 
            
            let strWhere = ""; 
            strWhere += ` AND session_id = '${clientSessionId}'`;

            client.get(strWhere).then((result,field)=>{

                  if(result.length > 0)
                  {
                        next(); 
                  }
                  else{
                        res.redirect("/login"); 
                        return false; 
                  } 
            
            }).catch((err)=>{
                  console.log(err); 
                  res.json("Error " + err); 
                  return false; 

            })

     
      }
      else{
            next(); 
      }
      
}

