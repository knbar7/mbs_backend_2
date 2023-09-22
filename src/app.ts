import express from "express";
import { prisma } from "../prisma/prisma-instance";
import "express-async-errors";
import { IntentionObject, QuestionObject, ThreeToOneObject, UserObject } from "./types";



const app = express();
app.use(express.json());
// All code should go below this line

// Get Hello World
app.get("/", (_req, res) => {
  res.json({ message: "Hello World!" }).status(200); // the 'status' is unnecessary but wanted to show you how to define a status
});

// Get all users
app.get("/user", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all questions
app.get("/question", async (_req, res) => {
  try {
    const questions = await prisma.question.findMany();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all intentions
app.get("/intention", async (_req, res) => {
  try {
    const intentions = await prisma.intention.findMany();
    res.status(200).json(intentions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all three-to-one
app.get("/three-to-one", async (_req, res) => {
  try {
    const threeToOnes = await prisma.threeToOne.findMany();
    res.status(200).json(threeToOnes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//get a specific user by ID
app.get("/user/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10)

  if(isNaN(userId)) {
    res.status(400).json({ message: "ID must be a number" });
    return;
  }

  try{
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if(!user) {
      res.status(204).end();
    } else {
      res.status(200).json(user);
    }
  } catch(error){
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get a specific question by ID
app.get("/question/:id", async (req, res) => {
  const questionId = parseInt(req.params.id, 10);

  if(isNaN(questionId)) {
    res.status(400).json({ message: "ID must be a number"});
    return;
  }

  try{
    const question = await prisma.question.findUnique({
      where: {
        id: questionId
      }
    })

    if(!question) {
      res.status(204).end();
    } else {
      res.status(200).json(question);
    }
  } catch(error) {
    res.status(500).json({ message: "Internal Server Error"})
  }
})

//get a specific intention by ID
app.get("/intention/:id", async (req, res) => {
  const intentionId = parseInt(req.params.id, 10);

  if(isNaN(intentionId)) {
    res.status(400).json({ message: "ID must be a number"});
    return;
  }

  try{
    const intention = await prisma.intention.findUnique({
      where: {
        id: intentionId
      }
    })

    if(!intention) {
      res.status(204).end();
    } else {
      res.status(200).json(intention);
    }
  } catch(error) {
    res.status(500).json({ message: "Internal Server Error"});
  }
})

//get a specific three-to-one by ID
app.get("/three-to-one/:id", async (req, res) => {
  const threeToOneId = parseInt(req.params.id, 10);

  if(isNaN(threeToOneId)) {
    res.status(400).json({ message: "ID must be a number"});
    return;
  }

  try{
    const threeToOne = await prisma.threeToOne.findUnique({
      where: {
        id: threeToOneId
      }
    })

    if(!threeToOne) {
      res.status(204).end();
    } else {
      res.status(200).json(threeToOne)
    }
  } catch(error) {
    res.status(500).json({ message: "Internal Server Error"})
  }
})

//create new user
app.post("/user", async (req, res) => {
  const newUser: UserObject = req.body;
  const errors = [];

  // Data type validation
  if (typeof newUser.name !== 'string') {
    errors.push('Name should be a string');
  }

  if (typeof newUser.email !== 'string') {
    errors.push('Email should be a string');
  }

  if (typeof newUser.password !== 'string') {
    errors.push('Password should be a string');
  }

  // Role validation
  if (newUser.role !== 'client' && newUser.role !== 'coach') {
    errors.push('Role can only be client or coach');
  }

  // Valid keys validation
  const validKeys = ['name', 'email', 'password', 'role'];
  const keys = Object.keys(newUser);
  for (const key of keys) {
    if (!validKeys.includes(key)) {
      errors.push(`${key} is not a valid key`);
    }
  }

  // Check for duplicate email (Assuming you have a Prisma model with a unique constraint on email)
  const existingUser = await prisma.user.findUnique({
    where: {
      email: newUser.email,
    },
  });

  if (existingUser) {
    errors.push('Email already exists');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const userPost = await prisma.user.create({ data: newUser });
      res.status(201).json(userPost);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Internal server error" });
    }
  }
});


//create new question
app.post("/question", async (req, res) => {
  const newQuestion: QuestionObject = req.body;
  const errors = [];

  if(typeof newQuestion.title !== 'string'){
    errors.push('title must be a string');
  }

  if(typeof newQuestion.description !== 'string'){
    errors.push('description must be a string')
  }

  const validKeys = ['title', 'description']
  const keys = Object.keys(newQuestion);
  for(const key of keys){
    if(!validKeys.includes(key)){
      errors.push(`${key} is not a valid key`);
    }
  }

  if(errors.length > 0){
    res.status(400).json({ errors });
  } else {
    try{
      const questionPost = await prisma.question.create({ data: newQuestion });
      res.status(201).json(questionPost);
    } catch(error) {
      res.status(500).json({ error: 'internal server error'})
    }
  }
})

//create new intention
app.post("/intention", async (req, res) => {
  const newIntention: IntentionObject = req.body;
  const errors = [];
  const stringKeys = ['intention','cue1','cue2','cue3'];
  const validKeys = stringKeys;

  if(typeof newIntention.intention !== 'string'){
    errors.push('Intention must be a string')
  }

  if(typeof newIntention.cue1 !== 'string'){
    errors.push('Cue must be a string')
  }

  if(typeof newIntention.cue2 !== 'string'){
    errors.push('Cue must be a string')
  }

  if(typeof newIntention.cue3 !== 'string'){
    errors.push('Cue must be a string')
  }

  const keys = Object.keys(newIntention);
  for(const key of keys){
    if(!validKeys.includes(key)){
      errors.push(`${key} is not a valid key`)
    }
  }

  if(errors.length > 0){
    res.status(400).json({ errors })
  } else {
    try{
      const intentionPost = await prisma.intention.create({ data: newIntention });
      res.status(201).json(intentionPost);
    } catch(error){
      res.status(500).json({ error: 'internal server error'})
    }
  }
})

//create new three-to-one
app.post("/three-to-one", async (req, res) => {
  const newThreeToOne: ThreeToOneObject = req.body;
  const errors = [];
  const stringKeys = ['worked1','worked2','worked3','improve1'];
  const validKeys = stringKeys;

  if(typeof newThreeToOne.worked1 !== 'string'){
    errors.push('Entry must be a sting')
  }

  if(typeof newThreeToOne.worked2 !== 'string'){
    errors.push('Entry must be a sting')
  }

  if(typeof newThreeToOne.worked3 !== 'string'){
    errors.push('Entry must be a sting')
  }

  if(typeof newThreeToOne.improve1 !== 'string'){
    errors.push('Entry must be a sting')
  }

  const keys = Object.keys(newThreeToOne);
  for(const key of keys){
    if(!validKeys.includes(key)){
      errors.push(`${key} is not a valid key`);
    }
  }

  if(errors.length > 0){
    res.status(400).json({ errors });
  } else {
    try{
      const threeToOnePost = await prisma.threeToOne.create({ data: newThreeToOne });
      res.status(201).json(threeToOnePost);
    } catch(error) {
      res.status(500).json({ error: "internal server error"});
    }
  }
})

//update user
app.patch("/user/:id", async (req, res) => {
  const userId = Number(req.params.id);
  const validKeys = ['email','name','role','password'];

  const invalidKeys = Object.keys(req.body).filter(key => !validKeys.includes(key));

  if(invalidKeys.length > 0) {
    return res.status(400).json({ errors : invalidKeys.map(key => `${key} is not a valid key`)});
  }

  try{
    const userUpdate = await prisma.user.update({
      where: { id: userId },
      data: req.body
    });
    res.status(201).json(userUpdate);
  } catch(error){
    res.status(500).json({ error: "internal server error"});
  }
});

//delete user
app.delete("/user/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  if(isNaN(userId)){
    return res.status(400).json({ message: "ID should be a number"});
  }

  try{
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if(!existingUser){
      return res.status(204).end();
    }

    const userDelete = await prisma.user.delete({
      where: { id: userId }
    });

    res.status(200).json(userDelete);
  } catch(error){
    res.status(500).json({ error: "internal server error" })
  }
});

//delete question
app.delete("/question/:id", async (req, res) => {
  const questionId = parseInt(req.params.id);

  if(isNaN(questionId)){
    return res.status(400).json({ error: "ID must be a number" });
  }

  try{
    const existingQuestion = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if(!existingQuestion){
      return res.status(204).end();
    };

    const questionDelete = await prisma.question.delete({
      where: { id: questionId }
    });

    res.status(200).json(questionDelete);
  } catch(error){
    res.status(500).json({ error: "internal server error" })
  }
});

//delete intention
app.delete("/intention/:id", async (req, res) => {
  const intentionId = parseInt(req.params.id);

  if(isNaN(intentionId)){
    return res.status(400).json({ message: "ID must be a number" });
  }

  try{
    const existingIntention = await prisma.intention.findUnique({
      where: { id: intentionId }
    });

    if(!existingIntention){
      res.status(204).end();
    }

    const intentionDelete = await prisma.intention.delete({
      where: { id: intentionId }
    });

    res.status(201).json(intentionDelete);
  } catch(error){
    res.status(500).json({ error: "internal server error" });
  }
})

//delete 3 to 1
app.delete("/three-to-one/:id", async (req, res) => {
  const threeToOneId = parseInt(req.params.id);

  if(isNaN(threeToOneId)){
    return res.status(400).json({ message: "ID must be a number" });
  }

  try{
    const existingThreeToOne = await prisma.threeToOne.findUnique({
      where: { id: threeToOneId }
    })

    if(!existingThreeToOne){
      res.status(204).end();
    }

    const threeToOneDelete = await prisma.threeToOne.delete({
      where: { id: threeToOneId }
    });

    res.status(201).json(threeToOneDelete);
  } catch(error){
    res.status(500).json({ error: "internal server error"})
  }
})


// all your code should go above this line
app.use(errorHandleMiddleware);

const port = process.env.NODE_ENV === "test" ? 3001 : 3000;
app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}
`)
);
