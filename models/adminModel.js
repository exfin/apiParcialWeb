import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                
                return value.endsWith('@admin.com');
            },
            message: "Username must end with '@admin.com'."
        }
    },
    password: {
        type: String,
        required: true
    }
});

const adminModel = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export default adminModel;
