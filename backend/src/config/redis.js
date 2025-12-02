import redis from 'redis';

// Inisialisasi klien Redis tunggal untuk blacklist token
const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

let redisEnabled = true;
let redisErrorLogged = false;

client.on('error', (err) => {
    if (!redisErrorLogged) {
        console.log('Redis disabled (connection error):', err.message);
        redisErrorLogged = true;
    }
    redisEnabled = false;
});

// Koneksi segera saat modul di-load (jika gagal, fitur blacklist akan dinonaktifkan)
(async () => {
    try{
        await client.connect();
        redisEnabled = true;
        console.log('Redis client connected');
    } catch (error) {
        redisEnabled = false;
        if (!redisErrorLogged) {
            console.log('Redis connection failed, blacklist is disabled:', error.message);
            redisErrorLogged = true;
        }
    }
})();

export { client as redisClient, redisEnabled };
