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

//authorize users
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    // If authentication is successful, send a 200 response
    res.status(200).send({
      message: 'Authentication successful',
    });
  });



  app.get('/api/user', (req,res) =>{
    if(!req.user){
       return res.sendStatus(401);
    }
    console.log(req.session);
    console.log(req.user);
    res.status(200).send({"message":"oki"});
  })

  app.post('/api/user', (req,res) => {
    console.log(req.body);
    return res.redirect("http://localhost:5173");
  })
  
  