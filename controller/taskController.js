import execQuery from "../config/connection.js";

export const addNewTask = async(req, res) =>{
    try{
        console.log("req.body",req.body);
        const { heading, description,date,priority,imageUrl} = req.body;
      
        const insertQuery = `INSERT INTO tasks (heading,description,date,priority,image) VALUES (?, ?, ?, ?, ?)`;
       
        const values=[heading, description, date, priority, imageUrl];
      
        execQuery(insertQuery,values).then((result)=>{
        console.log("ijh=",result);
        res.status(200).json({ message: "success", data: result });
        })
    }catch(err){
        console.log("error=",err);
    }
}

export const getTasks = async (req, res )=>{
    try{
        const getQuery = `SELECT * FROM tasks ORDER BY date DESC`;
        const values=[]
        execQuery(getQuery,values).then((result)=>{
            res.status(200).json({ message: "success", data: result });
        })
    }
    catch(err){
      console.log(err);
    }
}

export const editTask = async (req, res ) =>{
   try{
       const {id, heading, description,date,priority,image,imageUrl,formattedDate} = req.body;
       const img = imageUrl ? imageUrl : image;
       const dates = formattedDate ? formattedDate : date;
       const insertQuery = `UPDATE tasks SET heading = ?, description = ?, date = ?, priority = ?, image = ? WHERE id = ?`;
       const values = [heading, description, dates, priority, img, id];
        execQuery(insertQuery,values).then((result)=>{ 
        console.log(result);
        res.status(200).json({ message: "success", data: result });
       })
   }catch(err){
    console.log(err);
   }
}

export const deleteTask = async (req,res) =>{
    try{
        const {id}=req.body 
        const deleteQuery=`DELETE FROM tasks WHERE id=?`
        const values=[id]
        execQuery(deleteQuery,values).then((result)=>{
            res.status(200).json({ message: "success" });
        })
        
    }
    catch(err){
      console.log(err);
    }
}

export const filterTask= async(req,res)=>{
    try {
        let getQuery;
        let values = [];
        const {priority}=req.body;
        if (priority && priority.toLowerCase() === 'all') {
            getQuery = `SELECT * FROM tasks`;
        } else {
            getQuery = `SELECT * FROM tasks WHERE priority = ? ORDER BY date DESC`;
            values = [priority];
        }
        const result = await execQuery(getQuery, values).then((result)=>{
            res.status(200).json({ message: "success", data: result });
        })
        
    } catch (error) {
        console.log(error);
    }
 }
  