const {pool} = require("../database/db.js")

const getFriends = async (id_user) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT f.user_id,f.friend_id, u.username, u.avatar FROM friends f INNER JOIN public.users u on u.id = f.friend_id WHERE f.user_id = $1 and f.status = 1'
        let values = [id_user];
        let result = await client.query(sql, values);
        return result.rows;

    }catch(err){
        console.log(err)
        return []
    }finally {
        client.release()

    }

}

const addFriend = async (id_user,id_friend)=> {
    const client = await pool.connect();
    try {
        let sql = 'INSERT INTO friends (user_id, friend_id, status) VALUES ($1,$2,0)RETURNING *'

        let values = [id_user,id_friend];
        let result = await client.query(sql, values);
        return result.rows;
    } catch (err) {
        console.log(err)
    } finally {
        client.release()
    }
}

const removeFriend = async (id_user, id_friend) => {
    const client = await pool.connect();
    let result;

    try {
        await client.query('BEGIN');
        let sql = 'DELETE FROM friends WHERE user_id = $1 AND friend_id = $2 RETURNING *';
        let values = [id_user, id_friend];
        result = await client.query(sql, values);

        if (result.rows.length > 0) {
            sql = 'DELETE FROM friends WHERE user_id = $1 AND friend_id = $2 RETURNING *';
            values = [id_friend, id_user];
            result = await client.query(sql, values);

            await client.query('COMMIT');
            return result.rows;
        } else {
            await client.query('ROLLBACK');
            return [];
        }
    } catch (err) {
        console.log(err);
        await client.query('ROLLBACK');
        return [];
    } finally {
        client.release();
    }
};



const acceptFriend = async (id_user, id_friend) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        let sql = 'UPDATE friends SET status = 1 WHERE user_id = $1 AND friend_id = $2 RETURNING *';
        let values = [id_friend, id_user];
        let result = await client.query(sql, values);

        if (result.rows.length > 0) {
            // Only proceed with the insert if the update was successful
            sql = 'INSERT INTO friends (user_id, friend_id, status) VALUES ($1, $2, 1) RETURNING *';
            values = [id_user, id_friend];
            result = await client.query(sql, values);

            await client.query('COMMIT');
            return result.rows;
        } else {
            await client.query('ROLLBACK');
        }
    } catch (err) {
        console.log(err);
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
};

const  removeFriendRequest = async (id_user, id_friend) => {
    const client = await pool.connect();
    try{
        let sql = 'DELETE  FROM friends WHERE user_id = $1 AND friend_id = $2 RETURNING *'
        let values = [id_friend, id_user];
        let result = await client.query(sql, values);
        return result.rows;
    }catch (err){
        console.log(err)
        return []
    }finally {
        client.release()
    }

}

const getFriendRequests = async (id_user) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT u.username ,u.avatar, u.id FROM friends f  inner join public.users u on u.id = f.user_id WHERE f.friend_id = $1 and f.status = 0;'
        let values = [id_user];
        let result = await client.query(sql, values);
        return result.rows;

    }catch(err){
        console.log(err)
        return []
    }finally {
        client.release()

    }
}

const blockFriendRequest = async (id_user, id_friend) => {
    const client = await pool.connect();
    try{
        let sql = 'UPDATE friends SET status = -1 WHERE user_id = $1 AND friend_id = $2 RETURNING *'
        let values = [id_friend, id_user];
        let result = await client.query(sql, values);
        return result.row;
    }catch (err){
        console.log(err)
        return []
    }finally {
        client.release()
    }
}

const getBlockedFriendRequest = async (id_user) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT * FROM friends f WHERE f.friend_id = $1 and f.status = -1'
        let values = [id_user];
        let result = await client.query(sql, values);
        return result.row;

    }catch(err){
        console.log(err)
        return []
    }finally {
        client.release()

    }
}

const unblockFriendRequest = async (id_user, id_friend) => {
    const client = await pool.connect();
    try{
        let sql = 'UPDATE friends SET status = 0 WHERE user_id = $1 AND friend_id = $2 RETURNING *'
        let values = [id_friend, id_user];
        let result = await client.query(sql, values);
        return result.row;
    }catch (err){
        console.log(err)
        return []
    }finally {
        client.release()
    }
}


const getListNotFriendStartLike = async (id_user, username) => {
    const client = await pool.connect();
    try{
        let sql = 'SELECT * FROM users WHERE username ILIKE $1 and id not in (SELECT friend_id FROM friends WHERE user_id = $2) and users.id != $2 LIMIT 10;'
        let values = ["%"+username+"%", id_user];
        let result = await client.query(sql, values);
        return result.rows;

    }catch(err){
        console.log(err)
        return []
    }finally {
        client.release()

    }

}







module.exports = {
    getFriends,
    removeFriend,
    addFriend,
    acceptFriend,
    removeFriendRequest,
    getFriendRequests,
    blockFriendRequest,
    getBlockedFriendRequest,
    unblockFriendRequest,
    getListNotFriendStartLike
}
