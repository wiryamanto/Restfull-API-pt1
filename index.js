const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:false}));

const koneksiDB =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "pertemuan1"
})

koneksiDB.connect((err)=>{
    if(err){
        console.log("database not connect");
    }else{
        console.log("database terhubung");
    }
});

// get data food
app.get("/api/food", (req, res)=>{
    let sql= "select * from foods";
    koneksiDB.query(sql, (err, result)=>{
        if(err){
            res.render({
                msg: "fail get data",
                status: 500,
                err,
            })
        }else{
            res.send({
                msg: "success get data",
                status: "200",
                data: result,
            });
        }
    });
});

// add data food
app.post("/api/food", (req,res)=>{
    let {body}= req;
    let sql = "insert into foods set?";
    koneksiDB.query(sql, body, (err,result)=>{
        if(err){
            res.send({
                msg: "add data err",
                status: "500",
                err,
            })
        }else{
            let newBody = {
                id: result.insertId,
                ...body,
            
            }
            res.send({
                msg: "add data success",
                status: 200,
                data: newBody,
            });
        }
    });
});

//get data food by id
app.get("/api/food/:id", (req, res) =>{
    let {id} = req.params;
    let sql = `select * from foods where id=${id}`
    koneksiDB.query(sql, (err, result)=>{
        if(err){
            res.send({
                msg: "get data id error",
                status: 500,
                err,
            })
        }else{
            res.send({
                msg: "get data id success",
                status: 200,
                data:result,
            })
        }
    })
})

delete data
app.delete("/api/food/:id", (req,res) =>{
    let {id} = req.params;
    let sql = `DELETE FROM foods where id=${id}`
    koneksiDB.query(sql, (err, data) =>{
        if(!err){
            res.send({
                msg: "delete data id succes",
                status: 200,
                data,
            })
        }else{
            res.send({
                msg: "delete data id error",
                status: 500,
                err
            })
        }
    })
})


app.put ("/api/food/:id", (req, res) =>{
    let {id} = req.params;
    let {body} = req;
    let sql = ` update foods set ? where id =${id}`
    koneksiDB.query(sql, body, (err, result) =>{
        if(err){
            res.send({
                msg: " update data err",
                status: 500,
                err,
            })
        }else{
            let newBody = {
                id: result.insertId,
                ...body,
            }
            res.send({
                msg: "update data success",
                status: 200,
                data: newBody,
            })
        }
    })
})


app.listen(port ,()=>{
    console.log("server jalan port" + port);
})