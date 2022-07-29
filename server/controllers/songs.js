import Song from "../models/song.js";

export const getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        console.log(songs);
        res.status(200).json(songs);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

export const createSong = async (req, res) => {
    const song = req.body;
    console.log(song);

    const newSong = new Song(song);

    try {
        await newSong.save();

        res.status(201).json(newSong);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}