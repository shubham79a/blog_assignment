import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String, required: true, unique: true, lowercase: true,
    },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

export default mongoose.model('User', userSchema);

