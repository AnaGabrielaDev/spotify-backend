import {type Request, type Response} from 'express';
import {connection} from '../database/connection';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

type Authenticate = {
	email: string;
	password: string;
};
export class AuthController {
	async authenticate(req: Request, res: Response) {
		const {email, password} = req.body as Authenticate;
		if (!email || !password) {
			return res.status(401).send('Email ou senha incorreto');
		}

		const user = await connection.user.findUnique({
			where: {
				email,
			},
		});
		if (!user) {
			return res.status(401).send('Email ou senha incorreto');
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(401).send('Email ou senha incorreto');
		}

		const token = jsonwebtoken.sign({
			sub: user.id,
			email: user.email,
			name: user.name,
		}, process.env.JWT_SECRET!, {
			expiresIn: '1d',
		});

		res.json({
			accessToken: token,
		});
	}
}
