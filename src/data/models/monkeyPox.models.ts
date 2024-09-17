import mongoose, { mongo } from "mongoose";

const MonkeyPoxSchema = new mongoose.Schema({
    nombrePaciente: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    isSent: {
        type: Boolean,
        required: false,
        default: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

export const monkeyPoxModel = mongoose.model('MonkeyPox', MonkeyPoxSchema);