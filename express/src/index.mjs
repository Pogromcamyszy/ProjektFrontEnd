import express from "express";
import cors from "cors";
import connection from "./Database/Connection.mjs";
import passport from "passport";
import session from "express-session";
import "./Login/loginPassport.mjs";
import multer from 'multer';
import fs from 'fs';
import path from 'path'

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

//image storage
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// api to handle post creation
app.post('/api/postcreate', upload.single('image'), (req, res) => { 
  if (!req.user) return res.status(401).json({ error: 'Not authenticated.' });

  const id = req.user.user_id;
  const { title, description, new_album, album_id } = req.body;
  const file = req.file;

  if (!title || !description || !file) {
    return res.status(400).json({ error: 'Title, description, and image are required.' });
  }

  if (!album_id && !new_album) {
    return res.status(400).json({ error: 'Please select an album or create a new one.' });
  }

  let finalAlbumId = album_id;

  if (new_album && new_album.trim()) {
    const query = 'INSERT INTO album (album_name, user_id) VALUES (?, ?)';
    connection.query(query, [new_album.trim(), id], (err, result) => {
      if (err) {
        console.error('Failed to create new album:', err);
        return res.status(500).json({ error: 'Failed to create album.' });
      }

      finalAlbumId = result.insertId;
      insertPost(finalAlbumId);
    });
  } else {
    insertPost(finalAlbumId);
  }

  function insertPost(albumId) {
    const filePath = file.path;

    const query = 'INSERT INTO posts (fk_user_id, title, post_description, post_img, album_id) VALUES (?, ?, ?, ?, ?)';
    const values = [id, title, description, filePath, albumId];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Failed to insert post:', err);
        return res.status(500).json({ error: 'Failed to create post.' });
      }

      res.status(201).json({
        message: 'Post created successfully.'
      });
    });
  }
});



// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

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
  }

   if(!nick || nick.trim() === ""){
    return res.status(400).send({message:"Bad request"});
   }

   const query = "SELECT user_id FROM users WHERE user_nickname LIKE ?";
   connection.query(query,[nick],(err,resault) =>{
    try{
      if(err) return res.status(500).send({message:"Internal server error"});
      if(resault.length == 0) {
        return res.status(200).send({message:"There is no user",agree:true});
      }   
      else return res.status(200).send({message:"user found",agree:false});
    }
    catch(error){
      return(error.status);
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
        return res.status(201).send({ message: "User created successfully" });
      } catch (error) {
        console.error(error); // Log unexpected errors
        return res.status(500).send({ message: "Unexpected error occurred" });
      }
    }
  );
});

//getauth
  app.get('/api/auth', (req,res) =>{
    if(!req.user){
       return res.sendStatus(401);
    }
    res.status(200).send({"message":"oki"});
  });

//// get Peofile
  app.get('/api/profile',(req,res) => {
    try{
      if(!req.user){
        return res.status(401).send({message:"Not logged"})
      }
      const user = req.user;
      return res.status(200).send(user);
    }
    catch(error){
      return res.status(error.status).send({message:`Error occuered ${error.status}`});
    }
     });

 //get specific user by nick
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


/// get post info 
app.get("/api/getPostInfo/:id", (req, res) => {
  const postId = req.params.id;  // Get post_id from route parameter

  const user = req.user; 
  const currentUserId = user.user_id;

  // SQL query to fetch post data along with album name
  const query = `
    SELECT 
      u.user_id, 
      u.user_nickname, 
      p.post_id, 
      p.post_description, 
      p.post_img, 
      p.title,
      a.album_name,  
      u.user_id AS user_id
    FROM 
      users u
    JOIN 
      posts p ON u.user_id = p.fk_user_id
    LEFT JOIN 
      album a ON p.album_id = a.album_id  
    WHERE 
      p.post_id = ?;
  `;

  connection.execute(query, [postId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const postData = results[0];
    postData.currentUserId = currentUserId;  // Add the current user's ID

    // Send the post data, including the album name
    console.log(postData);
    res.json(postData);
  });
});

///add comments
app.post("/api/addComment", (req, res) => {
  const content = req.body.content;
  const postId = req.body.postId;
  const user_id = req.user.user_id;

  const query = "INSERT INTO comments (user_id, post_id, text) VALUES (?, ?, ?)";
  
  connection.execute(query, [user_id, postId, content], (err, result) => {
    if (err) {
      console.error("Error inserting comment:", err);
      return res.status(500).json({ message: "Failed to add comment" });
    }

    console.log("New comment added:", result);
    return res.status(201).json({
      message: "Comment added successfully",
      comment_id: result.insertId, // Ensure the comment_id is returned in the response
      user_nickname: req.user.user_nickname, // Assuming `user_nickname` is in the session
    });
  });
});




///getComment 
app.get("/api/getComment/:commentId", (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?.user_id; // Assuming user authentication middleware

  const query = `
    SELECT 
      comments.comment_id, 
      users.user_nickname, 
      comments.text, 
      comments.user_id 
    FROM comments
    JOIN users ON comments.user_id = users.user_id
    WHERE comments.comment_id = ?
  `;

  connection.query(query, [commentId], (err, results) => {
    if (err) {
      console.error("Error fetching comment:", err);
      return res.status(500).json({ message: "Failed to retrieve comment" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const comment = results[0];

    const isOwner = comment.user_id === userId;

    res.status(200).json({
      comment_id: comment.comment_id,
      user_nickname: comment.user_nickname,
      text: comment.text,
      isOwner,
    });
  });
});

///get IDs of user post 
app.get("/api/getUserPosts/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const query = "SELECT post_id FROM posts WHERE fk_user_id = ?";
  
  connection.execute(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user posts:", err);
      return res.status(500).json({ message: "Failed to fetch posts" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json(results);
  });
});

//getMyId

app.get("/api/getMyID",(req, res) => {
  const userId = req.user.user_id;
  if (userId) {
    res.json({ userId: userId });
  } else {
    res.status(400).json({ message: "User ID not found" });
  }
});

//gets if of comments for post
app.get("/api/getCommentsForPost/:postId", (req, res) => {
  const { postId } = req.params;
  console.log(postId);

  connection.query("SELECT comment_id FROM comments WHERE post_id = ?", [postId], function (err, result) {
    if (err) {
      console.error("Error fetching comments:", err);
      return res.status(500).json({ error: "Failed to fetch comments" });  // Return error status
    }
    
    return res.status(200).json(result);  // Return the response with status 200 and the list of comments
  });
});

///getId for user
app.get("/api/getID/:nickname", (req, res) => {
  const { nickname } = req.params; 

  const query = 'SELECT user_id FROM users WHERE user_nickname = ?'; 

  connection.query(query, [nickname], (err, result) => {
    if (err) {
      console.error("Error fetching user ID:", err);
      return res.status(500).json({ error: "Failed to fetch user ID" });
    }

    if (result.length > 0) {
      // If we find the user, send back the user ID
      return res.status(200).json({ userId: result[0].user_id });
    } else {
      // If no user is found, respond with an error
      return res.status(404).json({ error: "User not found" });
    }
  });
});

// logout
app.post('/api/logout',(req,res) =>{
  if(!req.user) return res.sendStatus(401);

  req.logout((err) =>{
    if(err) return res.sendStatus(400);
  });

  return res.sendStatus(200);
})

// Delete comment route
app.delete("/api/deleteComment/:comment_id", (req, res) => {
  const { comment_id } = req.params;
  const userId = req.user.user_id; // Assuming authentication middleware adds user info

  // Check if the comment exists and belongs to the user
  connection.query("SELECT * FROM comments WHERE comment_id = ?", [comment_id], (err, result) => {
    if (err) {
      console.error("Error fetching comment:", err);
      return res.status(500).json({ message: "Server error." });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Comment not found." });
    }
    
    if (result[0].user_id !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this comment." });
    }

    // Delete the comment
    connection.query("DELETE FROM comments WHERE comment_id = ?", [comment_id], (deleteErr) => {
      if (deleteErr) {
        console.error("Error deleting comment:", deleteErr);
        return res.status(500).json({ message: "Server error." });
      }
      res.status(200).json({ message: "Comment deleted successfully." });
    });
  });
});


// SQL query to delete a post by ID
app.delete('/api/deletePost/:postID', (req, res) => {
  const { postID } = req.params;

  const query = 'DELETE FROM posts WHERE post_id = ?';

  connection.query(query, [postID], (err, result) => {
    if (err) {
      console.error('Error deleting post:', err);
      return res.status(500).json({ message: 'Error deleting post' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  });
});

// Get all albums for the authenticated user
app.get("/api/getAlbums", (req, res) => {
  const userId = req.user.user_id; 

  const query = `
    SELECT album_id, album_name
    FROM album
    WHERE user_id = ?;
  `;

  connection.execute(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching albums:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No albums found" });
    }

    return res.json(results); 
  });
});

///get data for album display
app.get('/api/posts/album/:albumId', (req, res) => {
  const albumId = req.params.albumId;

  const query = `
    SELECT a.album_name, p.post_id, u.user_nickname
    FROM album a
    LEFT JOIN posts p ON a.album_id = p.album_id
    LEFT JOIN users u ON p.fk_user_id = u.user_id
    WHERE a.album_id = ?;
  `;

  connection.execute(query, [albumId], (err, results) => {
    if (err) {
      console.error("Error fetching posts for album:", err);
      return res.status(500).json({ error: "Failed to fetch posts for album" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No posts found for this album" });
    }

    const albumName = results[0].album_name;
    const posts = results
      .map((row) => ({
        post_id: row.post_id,
        user_nickname: row.user_nickname,
      }))
      .filter(p => p.post_id);

    res.json({ album_name: albumName, posts });
  });
});

//get albums id for user 
app.get("/api/albums/user/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT album_id, album_name
    FROM album 
    WHERE user_id = ?;
  `;

  connection.execute(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching albums:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No albums found for this user" });
    }

    res.json(results); 
  });
});

///get ids of search user if exist
app.get('/api/search/users/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;

  console.log(searchTerm);

  const query = `
    SELECT user_nickname
    FROM users
    WHERE user_nickname LIKE ?;
  `;

  connection.execute(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Failed to fetch users" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const userIds = results.map((row) => row.user_nickname); // Extract only the user IDs
    console.log(userIds);
    res.json(userIds); // Return the list of user IDs
  });
});


//get ids of post with search title if exist
app.get('/api/search/posts/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;

  const query = `
    SELECT post_id
    FROM posts
    WHERE title LIKE ?;
  `;

  connection.execute(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ error: "Failed to fetch posts" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    const postIds = results.map((row) => row.post_id); // Extract only the post IDs
    res.json(postIds); // Return the list of post IDs
  });
});

///get ids of search albums if exists
app.get('/api/search/albums/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;

  const query = `
    SELECT album_id
    FROM album
    WHERE album_name LIKE ?;
  `;

  connection.execute(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("Error fetching albums:", err);
      return res.status(500).json({ error: "Failed to fetch albums" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No albums found" });
    }

    const albumIds = results.map((row) => row.album_id); // Extract only the album IDs
    res.json(albumIds); // Return the list of album IDs
  });
});

//sends ids for homepage
app.get('/api/getfeed', (req, res) => {
  const query = `
  SELECT post_id FROM posts ORDER BY post_id ASC;
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ error: "Failed to fetch posts" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    // Return an array of post IDs (just the numbers)
    const postIds = results.map(post => post.post_id);
    return res.status(200).json(postIds);  // Sending array of IDs as JSON
  });
});