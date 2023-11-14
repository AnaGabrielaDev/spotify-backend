import { AuthController } from "./controllers/AuthController"
import { UsersController } from "./controllers/UsersController"
import { MusicController } from "./controllers/MusicController"

const { Router } = require("express")

export const routes = Router()

const authController = new AuthController()
const usersController = new UsersController()
const musicController = new MusicController()

routes.post('/users', usersController.create)
routes.post('/login', authController.authenticate)

routes.get('/music', musicController.list)
routes.post('/music', musicController.create)
