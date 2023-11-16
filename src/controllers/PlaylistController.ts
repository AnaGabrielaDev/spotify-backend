import { Request, Response } from "express";
import { connection } from "../database/connection";

export class PlaylistController {
    async create(req: Request, res: Response) {
        const {name, url, thumbnail, userId} = req.body;
        await connection.playlist.create({ data: {
            name, url, thumbnail, userId
        }});
    }
    async list(req: Request, res: Response) {
        const playlist = await connection.playlist.findMany();
        res.json(playlist);
    }
    async detail(req: Request, res: Response) {
        const {id} = req.params;
        const playlist = await connection.playlist.findUnique({
            where: {
                id
            }
        });
        res.json(playlist);
    }
}