const {newConnection}= require('../db/database')

async function obtener(req, res) {
    const conexion= await newConnection()
    const result = await conexion.query("SELECT * FROM tasks")
    res.json(result[0])
}

async function agregar(req, res) {
    const conexion= await newConnection()
    const {title, description,isComplete}=req.body;
    await conexion.query("INSERT INTO tasks (title, description, isComplete) VALUES (?,?,?)",[title, description,isComplete ])
    res.status(201).json({message:'Task agregado'})
}


async function obtenerId(req,res){
    const conexion= await newConnection()
    const id= req.params.id;
    const result = await conexion.query("SELECT * FROM tasks WHERE id=?",id)
    if(!result){
        res.status(404).json({message:'Task no encontrado'})
    } else {
        res.json(result[0])
    }
} 


module.exports = {
    obtenerId,
    agregar,
    obtener
}