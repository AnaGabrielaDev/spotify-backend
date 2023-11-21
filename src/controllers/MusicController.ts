import {type Request, type Response} from 'express';
import {type Prisma} from '@prisma/client';
import {connection} from '../database/connection';

type CreateMusic = {
	name: string;
	thumbnail: string;
	url: string;
};
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
			.values(req.files!);

		const musicFile = uploadArr.find(file => file.fieldname === 'music');
		const thumbnail = uploadArr.find(file => file.fieldname === 'thumbnail');

		const musicPath = this.mountUrl(req, musicFile.path);
		const thumbnailPath = this.mountUrl(req, req.files?.thumbnail[0].path as string);

		const {name} = req.body as CreateMusic;
		const music = await connection.music.create(
			{
				data: {
					name,
					url: musicPath,
					thumbnail: '',
				},
			},
		);

		return res.status(201).json(music);
	}

	private mountUrl(req: Request, path: string) {
		const {host} = req.headers;
		const filePath = `${req.protocol}://${host}/${path}`;
		return filePath;
	}
}
