import mysql from 'mysql2';

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',      
    user: 'root',           
    password: 'haslomaslo123',   // WINDOWS
    //password: 'HasloMaslo123@', // Linux
    database: 'imgbook'        
  });

  export default connection;