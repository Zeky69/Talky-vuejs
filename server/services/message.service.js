const {pool} = require("../database/db.js")



const createMessage = async (conversation_id,sender_id,text)=> {
    const client = await pool.connect();
    try {
        let sql = 'INSERT INTO messages (conversation_id, sender_id, text) VALUES ($1,$2,$3)RETURNING *'
        let values = [conversation_id,sender_id,text];
        let result = await client.query(sql, values);
        return result.rows;
    } catch (err) {
        console.log(err)
    } finally {
        client.release()
    }
}

const  removeMessage = async (id_message) => {
    const client = await pool.connect();
    try{
        let sql = 'DELETE  FROM messages WHERE id = $1 RETURNING *'
        let values = [id_message];

        let result = await client.query(sql, values);
        return result.row;
    }catch (err){
        console.log(err)
        return []
    }finally {
        client.release()
    }

}




module.exports = {
    createMessage,
    removeMessage
}
