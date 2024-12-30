import express from "express";
import cors from "cors";
import connection from "./Database/Connection.mjs";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.listen(PORT, () => {
    console.log("server started");
})

  app.get("/",(req,res) =>{
    const query = `SELECT * FROM test_table where name like 'Alice'`;
    connection.query(query,(err,resoult) => {
        if(err){
            console.log(err);
            return res.sendStatus(501);
        }

        res.json(resoult)
    })
  });

  
  


