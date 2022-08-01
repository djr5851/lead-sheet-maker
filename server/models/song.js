import mongoose from "mongoose";

const songSchema = mongoose.Schema({
    title: String,
    userId: String,
    creator: String,
    measures: [{
        id: String,
        beats: Number,
        chords: [{type: String}]
    }],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Song = mongoose.model('Song', songSchema);

export default Song;