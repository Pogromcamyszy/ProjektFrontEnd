import mysql from 'mysql2';

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',      // Replace with your database host
    user: 'root',           // Replace with your MySQL username
    //password: 'haslomaslo123',   // Replace with your MySQL password WINDOWS
    password: 'HasloMaslo123@', // Linux
    database: 'imgbook'        // Replace with your database name
  });

  export default connection;