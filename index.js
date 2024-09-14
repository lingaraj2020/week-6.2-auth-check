const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "lingaraj@2020";
const app = express();

app.use(express.json());

function auth(req, res, next) {
  const token=req.headers.token;
  const decodedData=jwt.verify(token,JWT_SECRET);
  if(decodedData.username){
    req.username=decodedData.username
    next();
  }else{
    res.json({
      message:"you are not logged in"
    })
  }

}
const users = [];
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = users.find((u) => u.username === username);
  if (user) {
    res.send("user already exist!");
  } else {
    users.push({
      username: username,
      password: password,
    });
  }
  res.json({
    message: "you are signed up",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (u) => u.username == username && u.password == password
  );
  if (!user) {
    res.json({
      message: "creditionals incorrect",
    });
    return;
  } else {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({
      token: token,
    });
  }
  res.json({
    message: "you are signin!",
  });
});


app.get("/me",auth,(req,res)=>{
    const user=req.username;
    res.send({
        username:user
    })
})
// app.get("/me", (req, res) => {
//   const token = req.headers.authorization;
//   const decodedinfo = jwt.verify(token, JWT_SECRET);
//   const username = decodedinfo.username;
//   const user = users.find((u) => u.username == username);
//   if (user) {
//     res.json({
//       username: user.username,
//       password: user.password,
//     });
//   } else {
//     res.json({
//       message: "unauthorized",
//     });
//   }
// });

app.listen(3000, () => {
  console.log("server running on port 3000");
});
