import { Router } from "express";
import { prisma } from "../../prisma/prisma-instance";
import 'express-async-errors';
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";
import bcrypt from 'bcrypt'
import { createTokenForUser, getDataFromAuthToken } from "../encryption";
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from "../types";
import { IGetUserAuthInfoRequest } from "../types";

const jwt = require('jsonwebtoken');
const authController = Router();

authController.post(
    "/auth/login",
    validateRequest({
        body: z.object({
            email: z.string().email(),
            password: z.string()
        })
    }), 
    async (
        { body: { email: bodyEmail, password: bodyPassword } },
        res
    ) => {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: bodyEmail,
                },
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordCorrect = await bcrypt.compare(
                bodyPassword,
                user.passwordHash,
            );

            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Generate a JWT token upon successful login
            const token = createTokenForUser(user);

            // Send the user data along with the token in the response
            return res.status(200).json({ message: "Logged in", token, user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
);

authController.get('/api/getUser', async (req, res) => {
    const [, token] = req.headers.authorization?.split?.(" ") || [];
    const myJwtData = getDataFromAuthToken(token);

    if(!myJwtData){
        return res.status(401).json({message: "invalid token"})
    }

    const user = await prisma.user.findFirst({
        where: {
            email: myJwtData.email,
        }
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
});

export { authController };
