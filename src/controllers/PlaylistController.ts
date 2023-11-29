import {type Request, type Response} from 'express';
import {connection} from '../database/connection';
import { mountFileUrl } from '../utils/mountFileUrl';

export class PlaylistController {
	async create(req: Request, res: Response) {
		const {name} = req.body;
    const thumbnail = req.file?.path;
    if (!thumbnail) {
      return res.status(400).json({
        error: 'Missing thumbnail',
      })
    }

    const thumbnailUrl = mountFileUrl(req, thumbnail);
		await connection.playlist.create({
			data: {
				name, thumbnail: thumbnailUrl, userId: req.user.sub,
			},
		});

		res.status(201).send();
	}

	async list(req: Request, res: Response) {
		const playlist = await connection.playlist.findMany({
      where: {
        OR: [
          {
            userId: null,
          },
          {
            userId: req.user?.sub,
          }
        ]
      }
    });

		res.json(playlist);
	}

	async detail(req: Request, res: Response) {
		const {id} = req.params;
		const playlist = await connection.playlist.findUnique({
			where: {
				id: parseInt(id, 10),
			},
		});

		res.json(playlist);
	}

	async addMusic(req: Request, res: Response) {
		const {id} = req.params;
		const {musicId} = req.body;

		const playlistId = parseInt(id, 10);
		const playlist = await connection.playlist.findUnique({
			where: {
				id: playlistId,
        userId: req.user.sub,
			},
		});
		if (!playlist) {
			return res.status(404).json({
				error: 'Playlist not found',
			});
		}

		await connection.playlistToMusic.create({
      data: {
        musicId: parseInt(musicId, 10),
        playlistId: playlist.id
      }
    });

		res.json(playlist);
	}

	async removeMusic(req: Request, res: Response) {
		const {id} = req.params;
		const {musicId} = req.body;

		const playlistMusic = await connection.playlistToMusic.findUnique({
			where: {
				playlistId_musicId: {
					playlistId: parseInt(id, 10),
					musicId: parseInt(musicId, 10),
				},
        Playlist: {
          userId: req.user.sub,
        }
			},
		});
		if (!playlistMusic) {
			return res.status(404).json({
				error: 'Music not found in playlist',
			});
		}

		await connection.playlistToMusic.delete({
			where: {
				playlistId_musicId: {
					playlistId: parseInt(id, 10),
					musicId: parseInt(musicId, 10),
				},
			},
		});

		res.status(204).send();
	}
}
