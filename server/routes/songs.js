import express from 'express'
import { getSongs, createSong, deleteSong, getSongById, updateSong, searchSongs } from '../controllers/songs.js';
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/', getSongs);
router.get('/search', searchSongs);
router.get('/:id', getSongById);
router.post('/', auth, createSong);
router.delete('/:id', auth, deleteSong);
router.put('/:id', auth, updateSong);

export default router;