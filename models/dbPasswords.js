import mongoose from "mongoose"

const passwordSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required : true
    }
}, {
    timestamps: true
})

export default mongoose.model('Password', passwordSchema)