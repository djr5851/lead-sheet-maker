import Song from "../models/song.js";

export const getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

export const getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        res.status(200).json(song);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

export const createSong = async (req, res) => {
    const song = req.body;
    const newSong = new Song(song);

    try {
        await newSong.save();
        res.status(201).json(newSong);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteSong = async (req, res) => {
    try {
        await Song.deleteOne( {_id: req.body.id} )
        res.status(200).send();
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateSong = async (req, res) => {
    const newSong = req.body;
    const song = await Song.findById(req.params.id);
    song.title = newSong.title;
    song.measures = newSong.measures;
    try {
        await song.save();
        res.status(200).send();
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}