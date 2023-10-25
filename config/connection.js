import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
    multipleStatements: true
})


const execQuery = async (query,values) => {
    return new Promise(async (resolve, reject) => {
        db.query(query,values,(err,res)=>{
           if(err){
            console.log("eee=",err);
                reject(err);
           }else{
                console.log("connected...");
                resolve(res);
           }
        })
    })
}

export default execQuery