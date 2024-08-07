const {newConnection}= require('../db/database')

async function obtener(req, res) {
    const conexion= await newConnection()
    const result = await conexion.query("SELECT * FROM tasks")
    res.status(201).json(result[0])


}
 
async function agregar(req, res) {
    const conexion= await newConnection()
    const {title, description,isComplete}=req.body;
    const regex = /^(\S+)( \S+)*$/

    if(title.length === 0 || description.length === 0){
        res.json({msg: "Los campos no deben estar vacios."})
    } else if (regex.test(title)){
        const isCompleteValue = isComplete === true || isComplete === 'true' ? 1 : 0;
        const result = await conexion.query("INSERT INTO tasks (`title`, `description`, `isComplete`) VALUES (?, ?, ?)", [title, description, isCompleteValue]);
        res.json({msg: "Task agregada correctamente", result})
        {
            if (result.affectedRows === 0) {
                res.json({msg: "No se encontró la task con el id especificado."});
            } else {
                res.json({msg: "Se agregó la task correctamente.", result});
            }
        }
}
    res.status(201).json({message:'Task agregado'})

    
}

async function actualizar(req, res) {
    const conexion= await newConnection()
    const id= req.params.id;
    const {title, description,isComplete}=req.body;
    const regex = /^(\S+)( \S+)*$/
    if(title.length === 0 || description.length === 0){
        res.json({msg: "Los campos no deben estar vacios."})

    } else if (regex.test(title)){
        const isCompleteValue = isComplete === true || isComplete === 'true' ? 1 : 0;
        const [result] = await conexion.query("UPDATE `tasks` SET `title`= ?,`description`= ?,`isComplete`= ? WHERE `id` = ?", [title, description, isCompleteValue, id]);
                if (result.affectedRows === 0) {
                    res.json({msg: "No se encontró la task con el id especificado."});
                } else {
                    res.status(200).json({msg: "Se editó la task correctamente.", result});
                }
        } else {
            res.status(404).json({msg: "Los títulos y descripciones no deben contener caracteres especiales o espacios innecesarios."})
        }


}

async function eliminar(req, res) {
    const conexion= await newConnection()
    const id= req.params.id;
    const [result] = await conexion.query("DELETE FROM tasks WHERE id=?",id)
    if (result.affectedRows === 0) {
        res.status(400).json({msg: "No se encontró la task con el id especificado."});
    } else {
        res.status(200).json({msg: "Se eliminó la task correctamente."});
    }

}

async function obtenerId(req,res){
    const conexion= await newConnection()
    const id= req.params.id;
    const [result] = await conexion.query("SELECT * FROM tasks WHERE id=?",id)
    if(!result){
        res.status(404).json({message:'Task no encontrado'})
    } else {
        res.status(200).json(result[0])
    }
} 


module.exports = {
    obtenerId,
    agregar,
    obtener,
    actualizar,
    eliminar
}