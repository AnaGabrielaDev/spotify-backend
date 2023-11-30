import {Router} from 'express';
import {AuthController} from './controllers/AuthController';
import {UsersController} from './controllers/UsersController';
import {MusicController} from './controllers/MusicController';
import {PlaylistController} from './controllers/PlaylistController';
import {upload} from './middlewares/uploadFile';
import {authMiddleware} from './middlewares/authMiddleware';

// eslint-disable-next-line new-cap
export const routes = Router();
const authController = new AuthController();
const usersController = new UsersController();
const musicController = new MusicController();
const playlistController = new PlaylistController();

routes.post('/users', usersController.create);
routes.put('/users', authMiddleware(), usersController.editUser);
routes.post('/login', authController.authenticate);

routes.get('/playlist', authMiddleware(true), playlistController.list);
routes.get('/playlist/:id', playlistController.detail);
routes.post('/playlist', authMiddleware(), upload.single('thumbnail'), playlistController.create);
routes.patch('/playlist/:id/add', authMiddleware(), playlistController.addMusic);
routes.patch('/playlist/:id/remove', authMiddleware(), playlistController.removeMusic);

routes.get('/music', musicController.list);

// Rotas de ADMIN
routes.post('/music', upload.fields([
	{
		name: 'music',
	}, {
		name: 'thumbnail',
	},
]), musicController.create);

