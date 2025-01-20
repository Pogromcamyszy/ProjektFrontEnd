import express from "express";
import cors from "cors";
import connection from "./Database/Connection.mjs";
import passport from "passport";
import session from "express-session";
import "./Login/loginPassport.mjs";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  credentials: true,  // Allow cookies to be sent/received
}));
app.use(
  session({
    secret: 'your-secret-key', // Used to sign the session ID cookie
    resave: true,  // Don't resave the session if it wasn't modified
    saveUninitialized: false,  // Don't save an uninitialized session
    cookie: {
      httpOnly: true, // Prevent client-side access to the cookie (security)
      secure: false,  // Set to true if using HTTPS (for secure cookies)
      maxAge: 3600000,
    }
  })
);

//Adding passport to app
app.use(passport.initialize());
app.use(passport.session());

//making app to listen on port 
app.listen(PORT, () => {
    console.log("server started");
})

// Check if the connection is alive
connection.query('SELECT 1', (err, results) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Database connection is alive');
  }
});

  app.get("/",(req,res) =>{
    const query = `SELECT * FROM users `;
    connection.query(query,(err,resoult) => {
        if(err){
            console.log(err);
            return res.sendStatus(501);
        }

        res.json(resoult)
    })
  });

//authorize users and send cookies back
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    // If authentication is successful, send a 200 response
    res.status(200).send({
      message: 'Authentication successful',
    });
  });

//check if user is taken 
app.get('/api/taken/:nick',(req,res) => {
   const nick = req.params.nick;
   if(req.user){
   const presentNick = req.user.user_nickname;
   if(nick === presentNick){
    return res.status(200).send({message:"Nick is owned by you",agree:true});
   }
   if(!nick || nick.trim() === ""){
    return res.status(400).send({message:"Bad request"});
   }
  }
   const query = "SELECT user_id FROM users WHERE user_nickname LIKE ?";
   connection.query(query,[nick],(err,resault) =>{
    try{
      if(err) return res.status(500).send({message:"Internal server error"});
      if(resault.length == 0) return res.status(200).send({message:"There is no user",agree:true});   
      else return res.status(200).send({message:"user found", agree:false});
    }
    catch(error){
      console.log(error);
    }
   })
});

app.post('/api/registry', (req, res) => { // Fix argument order: req first, then res
  if(req.user){
      return res.status(401).send({
      message: 'Cannot registry when logged',
    });
   }
  console.log("i live");
  const user = req.body; // Correctly access the request body
  console.log(user);
  const query = "INSERT INTO users (user_nickname, user_password, user_description, user_name, user_lastName) VALUES (?,?,?,?,?)";
  connection.query(
    query,
    [user.user_nickname, user.user_password, user.user_description, user.user_name, user.user_lastName],
    (err, result) => {
      try {
        if (err) {
          console.error(err); // Log the error for debugging purposes
          return res.status(500).send({ message: "Internal server error" }); // Return error response
        }

        console.log(`user ${user.user_nickname}`);
        return res.status(200).send({ message: "User created successfully" });
      } catch (error) {
        console.error(error); // Log unexpected errors
        return res.status(500).send({ message: "Unexpected error occurred" });
      }
    }
  );
});

  app.get('/api/auth', (req,res) =>{
    if(!req.user){
       return res.sendStatus(401);
    }
    res.status(200).send({"message":"oki"});
  });

//// get Peofile
  app.get('/api/profile',(req,res) => {
    if(!req.user){
      return res.status(401).send({message:"Not logged"})
    }

    const user = req.user;
    return res.status(200).send(user);
 });

 app.get('/api/profile/:nick',(req,res) =>{
  const nick = req.params.nick;
  console.log(nick);
  const query = "SELECT * FROM users WHERE user_nickname LIKE ?"
  connection.query(query,[nick],(err,resault) =>{

      if(err) return res.status(500).send({message:"Server error"});
      
      if(resault.length == 0) return res.status(404).send({message:"Not found"});

      return res.status(200).json(resault[0]);
 
  })
 });

///update user profile
  app.put('/api/profile',(req,res) =>{
    if(!req.user){
      return res.sendStatus(401);
    }
    const newData = req.body;
    const id = req.user.user_id;
    console.log(newData);
    const query = `
    UPDATE users
    SET user_nickname = ?, user_description = ?, user_name = ?, user_lastName = ?
    WHERE user_id = ?
  `;

  connection.query(
    query,
    [newData.user_nickname, newData.user_description, newData.user_name, newData.user_lastName, id],
    (err, result) => {
      if (err) {
        console.error("Error updating profile:", err);
        return res.sendStatus(500);
      }

      if (result.affectedRows === 0) {
        return res.sendStatus(404);
      }

      return res.sendStatus(200);
    }
  )
})
  
  