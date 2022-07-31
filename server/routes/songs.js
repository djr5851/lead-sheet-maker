import express from 'express'
import { getSongs, createSong, deleteSong, getSongById, updateSong } from '../controllers/songs.js';

const router = express.Router();

router.get('/', getSongs);
router.get('/:id', getSongById);
router.post('/', createSong);
router.delete('/', deleteSong);
router.put('/:id', updateSong);

export default router;