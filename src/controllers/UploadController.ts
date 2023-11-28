import {type Request, type Response} from 'express';

export class UploadController {
	async upload(req: Request, res: Response) {
		const {path} = req.file!;
		const {host} = req.headers;
		const filePath = `${req.protocol}://${host}/${path}`;

		return res.json({url: filePath});
	}
}
