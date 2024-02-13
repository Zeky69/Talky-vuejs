const {pool} = require("../database/db.js")

const getAccount = async (username , password) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT * FROM users WHERE username = $1 AND password = $2'
        let values = [username,password];
        let result = await client.query(sql, values);
        return result.rows[0];
    }catch(err){
        console.log(err)
    }finally {
        client.release()

    }

}


const getAccountById = async (id_user) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT * FROM users WHERE id = $1'
        let values = [id_user];
        let result = await client.query(sql, values);
        return result.rows[0];
    }catch(err){
        console.log(err)
    }finally {
        client.release()

    }


}

const createAccount = async (username, password)=> {
    const client = await pool.connect();
    try {
        let sql = 'INSERT INTO users (username, password) VALUES ($1,$2)RETURNING *'
        let values = [username,password];
        let result = await client.query(sql, values);
        return result.row;
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




module.exports = {
    getAccount,
    removeAccount,
    createAccount,
    getAccountById
}
