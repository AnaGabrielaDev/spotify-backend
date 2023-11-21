import {type Request, type Response} from 'express';
import {type Prisma} from '@prisma/client';
import {connection} from '../database/connection';
import {mountFileUrl} from '../utils/mountFileUrl';


export class MusicController {
	async list(req: Request, res: Response) {
		const {name} = req.query;
		const filter: Prisma.MusicWhereInput = {};

		if (name) {
			filter.name = {
				contains: String(name),
			};
		}

		const musics = await connection.music.findMany({
			where: filter,
		});
		res.json(musics);
	}

	async create(req: Request, res: Response) {
		const uploadArr = Object
			.values(req.files!)
      .map((file: any) => file[0])

		const musicFile = uploadArr.find(file => file.fieldname === 'music');
		const thumbnail = uploadArr.find(file => file.fieldname === 'thumbnail');

    if(!musicFile || !thumbnail) {
      return res.status(400).json({
        error: 'Missing files',
      });
    }

		const musicPath = mountFileUrl(req, musicFile.path);
		const thumbnailPath = mountFileUrl(req, thumbnail.path);

		const {name} = req.body;
		const music = await connection.music.create(
			{
				data: {
					name,
					url: musicPath,
					thumbnail: thumbnailPath,
				},
			},
		);

		return res.status(201).json(music);
	}
}
