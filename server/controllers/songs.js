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
    if (!req.userId) res.status(403).send();

    try {
        const song = req.body;
        const newSong = new Song(song);
        newSong.userId = req.userId;
        newSong.creator = req.username;    
        await newSong.save();
        res.status(201).json(newSong);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (req.userId === song.userId) {
            await song.delete();
            res.status(200).send();
        }
        else {
            res.status(403).send();
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (req.userId === song.userId) {
            const newSong = req.body;
            song.title = newSong.title;
            song.measures = newSong.measures;    
            await song.save();
            res.status(200).send();
        }
        else {
            res.status(403).send();
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}