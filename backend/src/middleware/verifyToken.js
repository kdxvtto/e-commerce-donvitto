import jsonwebtoken from 'jsonwebtoken'
import { isTokenBlacklisted } from '../utils/blacklistt.js'

// Verifikasi JWT dan tolak jika tidak valid/ter-blacklist
const verifyToken = async (req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1]
    try {
        if(!token){
            return res.status(401).json({ 
                sucess : false,
                message: 'Unauthorized' 
            });
        }
        if(await isTokenBlacklisted(token)){
            return res.status(401).json({ 
                sucess : false,
                message: 'Token revoked' 
            });
        }
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET); // verifikasi token jika tidak valid akan di catch
        req.user = decoded;
        req.token = token;
        next();
    } catch (error) {
        return res.status(400).json({ 
            sucess : false,
            message: error.message 
        });
    }
}

export default verifyToken
