const {pool} = require("../database/db.js")





const getConversation = async (idConversation) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT * FROM messages m WHERE m.conversation_id = $1 ORDER BY m.created_at ;'
        let values = [idConversation];

        let result = await client.query(sql, values);
        return result.rows;

    }catch(err){
        console.log(err)
        return []
    }finally {
        client.release()

    }

}

const getParticipant = async (idConversation) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT p.user_id , u.avatar , u.username  FROM participants p inner join public.users u on u.id = p.user_id WHERE p.conversation_id = $1 ;'
        let values = [idConversation];

        let result = await client.query(sql, values);
        return result.rows;

    }catch(err){
        console.log(err)
        return []
    }finally {
        client.release()

    }


}

const createConversation = async (participants, name , isPrivate)=> {
    const client = await pool.connect();
    try {
        let sql = 'INSERT INTO conversations (name, private) VALUES ($1,$2) RETURNING *'
        let values = [ name, isPrivate];
        let conversation = await client.query(sql, values);
        let idConversation = conversation.rows[0].id;
        let sql2 = 'INSERT INTO participants (user_id, conversation_id) VALUES ($1,$2)'
        for (const participant of participants) {
            let values2 = [participant, idConversation];
            await client.query(sql2, values2);
        }
        return conversation.rows[0];

    } catch (err) {
        console.log(err)
    } finally {
        client.release()
    }
}

const  removeConversation = async (idConversation) => {
    const client = await pool.connect();
    try{
        let sql = 'DELETE  FROM conversations WHERE id = $1 RETURNING *'
        let values = [idConversation];

        let result = await client.query(sql, values);
        return result.row;
    }catch (err){
        console.log(err)
        return []
    }finally {
        client.release()
    }

}


const getConversationUser = async (idUser) => {
    const client = await pool.connect();
    try{
        let sql = `SELECT
                conv.id AS id,
                CASE
                    WHEN conv.private = FALSE THEN conv.name
                    ELSE usr.username
                    END AS name,
                CASE
                    WHEN conv.private = FALSE THEN conv.avatar
                    ELSE usr.avatar
                    END AS avatar
            FROM
                conversations conv
                    LEFT JOIN
                participants part ON conv.id = part.conversation_id
                    LEFT JOIN
                users usr ON conv.private = TRUE AND usr.id = (
                    SELECT user_id FROM participants WHERE conversation_id = conv.id AND user_id != $1 LIMIT 1
                )
            WHERE
                part.user_id = $1;


        `

        let values = [idUser];

        let result = await client.query(sql, values);
        return result.rows;

    }catch(err){
        console.log(err)
        return []
    }finally {
        client.release()

    }


}

const getConversationByIdWithUser = async (idConversation , id_user) => {
    const client = await pool.connect();
    try{
        let sql = `SELECT
                conv.id AS id,
                CASE
                    WHEN conv.private = FALSE THEN conv.name
                    ELSE usr.username
                    END AS name,
                CASE
                    WHEN conv.private = FALSE THEN conv.avatar
                    ELSE usr.avatar
                    END AS avatar
            FROM
                conversations conv
                    LEFT JOIN
                participants part ON conv.id = part.conversation_id
                    LEFT JOIN
                users usr ON conv.private = TRUE AND usr.id = (
                    SELECT user_id FROM participants WHERE conversation_id = conv.id AND user_id != $1 LIMIT 1
                )
            WHERE
                part.user_id = $1 AND conv.id = $2;
        `

        let values = [id_user  , idConversation];

        let result = await client.query(sql, values);
        return result.rows[0];

    }catch(err){
        console.log(err)
        return []
    }finally {
        client.release()

    }
}




module.exports = {
    getConversation,
    removeConversation,
    createConversation,
    getConversationUser,
    getParticipant,
    getConversationByIdWithUser
}
