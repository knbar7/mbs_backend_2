import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prisma-instance";


// Check if process.env.JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  throw new Error('JWT secret is not defined');
}

// Cast process.env.JWT_SECRET to Secret (string or buffer)
const jwtSecret: Secret = process.env.JWT_SECRET;

//encryption intensity
const saltRounds = 11;

export const encryptPassword = (password: string) => {
    return bcrypt.hash(password, saltRounds);
};

export const createUnsecuredUserInformation = (user: User) => ({
    id: user.id,
    email: user.email,
});

export const createTokenForUser = (user: User) => {
    return jwt.sign(
        createUnsecuredUserInformation(user),
        jwtSecret
    );
};

const jwtInfoSchema = z.object({
    email: z.string().email(),
    iat: z.number(),
});

export const getDataFromAuthToken = (token?: string) => {
    if(!token) return null;
    try{
        return jwtInfoSchema.parse(jwt.verify(token, jwtSecret));
    } catch(e) {
        console.error(e);
        return null;
    }
}

export const authenticationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const [, token] = req.headers.authorization?.split?.(" ") || [];
    const myJwtData = getDataFromAuthToken(token);
    if(!myJwtData) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    const userFromJwt = await prisma.user.findFirst({
        where: {
            email: myJwtData.email,
        },
    });
    if(!userFromJwt){
        return res.status(404).json({ message: "user not found"});
    }
    (req as any).user = userFromJwt;
    next();
}