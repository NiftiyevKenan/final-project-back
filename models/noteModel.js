import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const NoteModel = mongoose.model('Note', noteSchema);

export default NoteModel;
