import { redisClient, redisEnabled } from '../config/redis.js';

// Utilitas untuk blacklist token JWT di Redis
async function blacklistToken(token, expUnix){ // token dan waktu kedaluwarsa Unix diambil dari standarisasi unix epoch
    if(!token || !expUnix || !redisEnabled || !redisClient?.isOpen){
        return; // jika token/waktu tidak ada atau redis mati, abaikan
    }
    const now = Math.floor(Date.now() / 1000); // pembagian waktu dari milidetik ke detik
    const ttl = expUnix - now;
    if(ttl > 0){
        await redisClient.set(token, '1', { EX: ttl }); // nilai 1 hanya penanda jika token ada di blacklist
    }
}

async function isTokenBlacklisted(token){
    if(!redisEnabled || !redisClient?.isOpen){
        return false; // jika redis tidak aktif, anggap tidak ada blacklist
    }
    const result = await redisClient.get(token); // ambil token
    return result !== null; // jika tidak null berarti token ada di blacklist
}

export {
    blacklistToken,
    isTokenBlacklisted
}
