import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || 10);

// Schema user (password disembunyikan dengan select:false)
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select : false
    },
    address: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

// Hash password sebelum simpan dokumen baru/update
UserSchema.pre('save', async function (next) {
    try{
        if (this.isModified('password') || this.isNew) {
            if(this.password.length < 6){
                throw new Error('Password must be at least 6 characters');
            }
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Hash password ketika menggunakan findOneAndUpdate
UserSchema.pre('findOneAndUpdate', async function (next) {
    try{
        if (this._update.password) {
            if(this._update.password.length < 6){
                throw new Error('Password must be at least 6 characters');
            }
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            this._update.password = await bcrypt.hash(this._update.password, salt);
        }
        next();
    } catch (error) {
        next(error);
    }
})


export default mongoose.model('User', UserSchema);
