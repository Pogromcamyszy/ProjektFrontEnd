import express from "express";
import cors from "cors";
import connection from "./Database/Connection.mjs";
import passport from "passport";
import session from "express-session";
import "./Login/loginPassport.mjs";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(session({
  secret:"nienawidzePomidorow123",
  saveUninitialized:false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60,
  },
}));

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
  app.post('/api/auth', passport.authenticate('local'), (req, res) => {
    // If authentication is successful, send a 200 response
    res.status(200).send({
      message: 'Authentication successful',
      user: req.user,  // This will contain user info if authenticated
    });
  });

  app.get('/api/user', (req,res) =>{
    console.log(req.session);
    console.log(req.user);
    res.sendStatus(200);
  })
  
  


