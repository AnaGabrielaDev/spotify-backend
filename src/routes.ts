import { AuthController } from "./controllers/AuthController"
import { UsersController } from "./controllers/UsersController"
import { MusicController } from "./controllers/MusicController"
import { PlaylistController } from "./controllers/PlaylistController"

const { Router } = require("express")

export const routes = Router()

const authController = new AuthController()
const usersController = new UsersController()
const musicController = new MusicController()
const playlistController = new PlaylistController();

routes.post('/users', usersController.create)
routes.post('/login', authController.authenticate)

routes.get('/music', musicController.list)
routes.post('/music', musicController.create)

routes.post('/playlist', playlistController.create);
routes.get('/playlist', playlistController.list);
routes.get('/playlist/:id', playlistController.detail);