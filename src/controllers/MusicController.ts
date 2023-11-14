import { Request, Response } from "express";
import { connection } from "../database/connection";

export class MusicController {
    async list(req: Request, res: Response) {
        const musics = await connection.music.find()
        res.json(musics)
    }

    async create(req: Request, res: Response) {
        const {name, url, thumbnail} = req.body
        await connection.music.create({ data: {
            name, url, thumbnail
        }})
    }
}