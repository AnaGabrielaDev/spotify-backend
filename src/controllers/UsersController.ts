import { Request, Response } from "express";
import { connection } from "../database/connection";
import bcrypt from "bcryptjs"

export class UsersController {
    async create(req: Request, res: Response) {
        const requiredFields = ['name', 'email', 'password']
        const errors = [] as string[]
        for(const field of requiredFields) {
            const value = req.body[field]
            if(value) continue

            errors.push(`${field} as required`)
        }

        if(errors.length > 0) {
            return res.status(400).json({
                errors
            })
        }

        const hashPassword = await bcrypt.hash(req.body.password, 12)
        const user = await connection.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            }
        })

        return res.json({
            userId: user.id
        })
    }
}