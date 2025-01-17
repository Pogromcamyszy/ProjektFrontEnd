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
   if(req.user){
    res.status(401).send({
      message: 'Cannot registry when logged',
    });
   }
   
   const nick = req.params.nick;
   if(!nick || nick.trim() === ""){
    res.status(400).send({message:"Bad request"});
   }

   const query = "SELECT user_id FROM users WHERE user_nickname LIKE ?";
   connection.query(query,[nick],(err,resault) =>{
    try{
      if(err) res.status(500).send({message:"Internal server error"});
      if(resault.length == 0) res.status(200).send({message:"There is no user",agree:true});   
      else res.status(200).send({message:"user found", agree:false});
    }
    catch(error){
      console.log(error);
    }
   })
});

app.post('/api/registry', (req, res) => { // Fix argument order: req first, then res
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
        res.status(201).send({ message: "User created successfully" });
      } catch (error) {
        console.error(error); // Log unexpected errors
        res.status(500).send({ message: "Unexpected error occurred" });
      }
    }
  );
});

  app.get('/api/user', (req,res) =>{
    if(!req.user){
       return res.sendStatus(401);
    }
    console.log(req.session);
    console.log(req.user);
    res.status(200).send({"message":"oki"});
  });

  app.post('/api/user', (req,res) => {
    console.log(req.body);
    return res.redirect("http://localhost:5173");
  });
  
  