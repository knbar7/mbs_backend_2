import { Request } from "express"
export interface IGetUserAuthInfoRequest extends Request {
    user: JwtPayload,
}

export type UserObject = {
    name: string,
    email: string,
    password: string,
    role: string,
}

export type JwtPayload = {
    id: number,
    email: string,
    iat: number,
  };

export type QuestionObject = {
    title: string,
    description: string,
    authorId: number,
}

export type IntentionObject = {
    intention: string,
    cue1: string,
    cue2: string,
    cue3: string,
    authorId: number,
}

export type ThreeToOneObject = {
    worked1: string,
    worked2: string,
    worked3: string,
    improve1: string,
    authorId: number, 
}