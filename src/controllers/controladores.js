const {newConnection}= require('../db/database')

async function agregar(req, res) {
    const conexion= await newConnection()
    const {title, description,isComplete}=req.body;
    await conexion.query("INSERT INTO tasks (title, description, isComplete) VALUES (?,?,?)",[title, description,isComplete ])
    res.status(201).json({message:'Task agregado'})
}


async function obtenerId(req,res){
    const conexion= await newConnection()
    const id=req.params.id;
    const result = await conexion.Query("SELECT id FROM tasks WHERE id=?",[id])
    if(!result){
        res.status(200).json({message:'Task no encontrado'})
    } else {
        res.status(404).json({message:'Task  encontrado'})
    }

} 


module.exports = {
    obtenerId,
    agregar
}