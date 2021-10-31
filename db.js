const express =require('express')
const mysql=require('mysql')

const app=express()
const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"1234",
    database:"university"
});
//Connection to database
connection.connect((err)=>{
    if(!err){        
        console.log("Connected successfully to MySql server")
    }
    else{
        console.log(err)
    }
});

//db-table => Create Table in University DB
app.get("/db-table", (req,res)=>{
    const dbtable=`CREATE TABLE IF NOT EXISTS studentInfo(
        studentID varchar(10) NOT NULL,
        fname varchar(50) NOT NULL,
        lname varchar(50) NOT NULL,
        mobileNo varchar(15) NOT NULL,
        PRIMARY KEY (studentID))`

        
    connection.query("USE University",(err,result)=>{ // "Select Database"
        if(!err){
            connection.query(dbtable,(err,result)=>{
                if(!err){
                    console.log("Table created successfully",result)
                }
                else{
                    console.log(err)
                }
                
            });
        }
        else{
            console.log(err);
        }
        
    });
});
//db-insert => Insert Record into studentInfo Table

app.get("/db-insert", (req,res)=>{
    const dbInsert=`INSERT INTO studentInfo    (studentID,fname,lname,mobileNo)    VALUES  ('1','Yagnik','Desai','123456789'),    ('2','Nikunj','Bhimajiyani','123456789'),    ('3','Vatsal','Patel','123456789'),    ('4','Bhargav','Chaudhary','123456789')`;

    connection.query("USE University",(err,result)=>{
        if(!err){
            connection.query(dbInsert,(err,result)=>{
                if(!err){
                    console.log(`Total affected ROWS: ${result['affectedRows']}`)
                }
                else{
                    console.log(err)
                }
                
            });
        }
        else{
            console.log(err);
        }
        
    })
});

//db-display => Display Record from studentInfo Table
app.get("/db-display", (req,res)=>{
    const dbDisplay=`SELECT * from studentInfo`;
    connection.query("USE University",(err,result)=>{
        if(!err){
            connection.query(dbDisplay,(err,result)=>{
                if(!err){
                    console.log("The data to display is:");
                    console.log(result);
                }
                else{
                    console.log(err)
                }
                
            });
        }
        else{
            console.log(err);
        }
        
    })
        
        
})
//server running
app.listen(3000,()=>{
    console.log("Server is running on port number 3000")
})