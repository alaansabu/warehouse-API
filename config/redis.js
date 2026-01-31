const redis = require('redis');


const client = redis.createClient({
        url: "redis://localhost:6379"
    });
const runRedis = async () => {
    

    client.on('error', (err) => console.log("Redis Client Error:", err));

    try {
        await client.connect();
        console.log("Redis connected successfully!");

        await client.set('user_name', 'Alan');
        const value = await client.get('user_name');

        console.log(`The value stored in Redis is: ${value}`);
    } catch (err) {
        console.error("Could not connect to Redis:", err);
    }
};

runRedis()
module.exports = { runRedis ,client}