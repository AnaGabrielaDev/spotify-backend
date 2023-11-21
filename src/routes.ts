import { Router } from "express"
import { AuthController } from "./controllers/AuthController"
import { UsersController } from "./controllers/UsersController"
import { MusicController } from "./controllers/MusicController"
import { PlaylistController } from "./controllers/PlaylistController"
import { upload } from "./middlewares/UploadFile"

export const routes = Router()

const authController = new AuthController()
const usersController = new UsersController()
const musicController = new MusicController()
const playlistController = new PlaylistController();

routes.post('/users', usersController.create)
routes.post('/login', authController.authenticate)

routes.post('/playlist', playlistController.create);
routes.get('/playlist', playlistController.list);
routes.get('/playlist/:id', playlistController.detail);

routes.get('/music', musicController.list);
routes.post('/music', upload.fields([
	{
		name: 'music',
	}, {
		name: 'thumbnail',
	},
]), musicController.create);

