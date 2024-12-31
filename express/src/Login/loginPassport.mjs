import passport from 'passport';
import {Strategy} from 'passport-local';
import connection from '../Database/Connection.mjs';

export default passport.use(
    new Strategy(
      {
        usernameField: 'user_nickname',
        passwordField: 'user_password',
      },
      async (username, password, done) => {
        try {
          console.log(username);
          connection.query(
            'SELECT * FROM users WHERE user_nickname = ?',
            [username], 
            async (err, results) => {
              if (err) {
                return done(err); // Pass the error to done callback
              }
  
              if (results.length === 0) {
                // No user found
                return done(null, false, { message: 'Incorrect username' });
              }
  
              const user = results[0];
  
              if(password !== user.user_password){
                return done(null, false, { message: "Incorrect password"});
              }
  
              // Authentication successful
              return done(null, user);
            }
          );
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  // Serialize user into session (store the user ID)
passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.user_id);
  });
  
  // Deserialize user from session (retrieve the user by ID)
  passport.deserializeUser((id, done) => {
    console.log(id);
    connection.query('SELECT * FROM users WHERE user_id = ?', [id], (err, results) => {
      if (err) return done(err);
      if (results.length === 0) return done(null, false);
      done(null, results[0]);
    });
  });

