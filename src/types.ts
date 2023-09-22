export type UserObject = {
    name: string,
    email: string,
    password: string,
    role: string,
}

export type QuestionObject = {
    title: string,
    description: string,
}

export type IntentionObject = {
    intention: string,
    cue1: string,
    cue2: string,
    cue3: string,
}

export type ThreeToOneObject = {
    worked1: string,
    worked2: string,
    worked3: string,
    improve1: string,  
}