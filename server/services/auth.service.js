const {pool} = require("../database/db.js")
const {compare} = require("bcrypt");

const getAccount = async (username , password) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT * FROM users WHERE username = $1'
        let values = [username];
        let result = await client.query(sql, values);
        if(result.rows.length > 0){
            if(await compare(password, result.rows[0].password)){
                return result.rows[0];
            }
        }
        return null;
    }catch(err){
        console.log(err)
    }finally {
        client.release()

    }

}


const getAccountById = async (id_user ,password) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT * FROM users WHERE id = $1'
        let values = [id_user];
        let result = await client.query(sql, values);
        if(result.rows.length > 0){
            if(await compare(password, result.rows[0].password)){
                return result.rows[0];
            }
        }
        return null;

    }catch(err){
        console.log(err)
    }finally {
        client.release()

    }


}

const createAccount = async (username, password , email, avatar)=> {
    const client = await pool.connect();
    try {
        let sql = 'INSERT INTO users (username, password , email,avatar) VALUES ($1,$2,$3,$4)RETURNING *'
        let values = [username,password,email,avatar];
        let result = await client.query(sql, values);
        return result.rows[0];
    } catch (err) {
        console.log(err)
    } finally {
        client.release()
    }
}

const removeAccount = async (id_user) => {
    const client = await pool.connect();
    try{
        let sql = 'DELETE  FROM users WHERE id = $1 RETURNING *'
        let values = [id_user];
        let result = await client.query(sql, values);
        return result.row;
    }catch (err){
        console.log(err)
        return []
    }finally {
        client.release()
    }

}


const getAccountByUsername = async (username) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT * FROM users WHERE username = $1'
        let values = [username];
        let result = await client.query(sql, values);
        return result.rows;
    }catch(err){
        console.log(err)
    }finally {
        client.release()

    }


}



const setNewAvatar = async (id_user, avatar) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT avatar FROM users WHERE id = $1'
        let values = [id_user];
        let oldAvatar = await client.query(sql, values);
        if(oldAvatar.rows.length === 0){
            return null;
        }

         sql = 'UPDATE users SET avatar = $1 WHERE id = $2 '
         values = [avatar, id_user];
         await client.query(sql, values);
        return oldAvatar.rows[0].avatar;
    }catch(err){
        console.log(err)
    }finally {
        client.release()
    }
}



module.exports = {
    getAccount,
    removeAccount,
    createAccount,
    getAccountById,
    getAccountByUsername,
    setNewAvatar
}
