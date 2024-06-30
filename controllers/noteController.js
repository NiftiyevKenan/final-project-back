import NoteModel from '../models/noteModel.js';

const notePost = async (req, res) => {
    try {
        const { image, title, number, price, category } = req.body;
        const newNote = new NoteModel({
            image,
            title,
            number,
            price,
            category
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getNote = async (req, res) => {
    try {
        const allNotes = await NoteModel.find();
        res.json(allNotes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getByIdNote = async (req, res) => {
    const { id } = req.params;
    try {
        const getById = await NoteModel.findById(id);
        if (!getById) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(getById);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedData = await NoteModel.findOneAndDelete({ _id: id });
        if (!deletedData) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({ deletedData });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export { notePost, getNote, getByIdNote, deleteById };
