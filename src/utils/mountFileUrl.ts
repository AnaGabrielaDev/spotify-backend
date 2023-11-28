import {type Request} from 'express';

export function mountFileUrl(req: Request, path: string) {
	const {host} = req.headers;
	const filePath = `${req.protocol}://${host}/${path}`;
	return filePath;
}
