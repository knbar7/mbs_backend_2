import { prisma } from "./prisma-instance";

export async function seedUsers() {
  const kendall = await prisma.user.create({
    data: {
      email: "kendall@email.com",
      name: "Kendall",
      role: "coach",
      password: "password",
    },
  });
  const calvin = await prisma.user.create({
    data: {
      email: "calvin@email.com",
      name: "Calvin",
      role: "client",
      password: "password",
    },
  });
  const kennady = await prisma.user.create({
    data: {
        email: "kennady@email.com",
        name: "Kennady",
        role: "client",
        password: "password",
    }
  })
  const aza = await prisma.user.create({
    data: {
      email: "aza@email.com",
      name: "Aza",
      role: "client",
      password: "password",
    },
  });
  const michelle = await prisma.user.create({
    data: {
      email: "michelle@email.com",
      name: "Michelle",
      role: "client",
      password: "password",
    },
  });

  return {
    userArray: [kendall, calvin, aza, michelle],
    users: {
      kendall,
      calvin,
      aza,
      michelle,
    },
  };
}

export async function seedQuestions() {
  const kendallQuestion = await prisma.question.create({
    data: {
      title: "What is a cue?",
      description: "I don't quite understand",
      authorId: 1,
    },
  });
  const calvinQuestion = await prisma.question.create({
    data: {
      title: "How many words is a cue?",
      description: "was it supposed to be 4?",
      authorId: 2,
    },
  });
  const azaQuestion = await prisma.question.create({
    data: {
      title: "Is 'do less chores' a good cue?",
      description: "I can't remember what you said about less...",
      authorId: 3,
    },
  });
  const kennadyQuestion = await prisma.question.create({
    data: {
      title: "Can I make a cue specifically for climbing?",
      description: "how would I use a cue for climbing?",
      authorId: 4,
    },
  });
  const michelleQuestion = await prisma.question.create({
    data: {
      title: "How long should I use the same cue?",
      description: "I am wondering if I should be switching more often than I am currently",
      authorId: 5,
    },
  });
  const calvinQuestion2 = await prisma.question.create({
    data: {
      title: "What is a cue?",
      description: "I don't quite understand",
      authorId: 2,
    },
  });

  return {
    questionArray: [kendallQuestion, calvinQuestion, azaQuestion, michelleQuestion, calvinQuestion2],
    questions: {
      kendallQuestion,
      calvinQuestion,
      azaQuestion,
      michelleQuestion,
      calvinQuestion2,
    },
  };
}

export async function seedIntentions() {
    const kendallIntention = await prisma.intention.create({
      data: {
        intention: "What is a cue?",
        cue1: "I don't quite understand",
        cue2: "I don't quite understand",
        cue3: "I don't quite understand",
        authorId: 1,
      },
    });
    const calvinIntention = await prisma.intention.create({
      data: {
        intention: "What is a cue?",
        cue1: "I don't quite understand",
        cue2: "I don't quite understand",
        cue3: "I don't quite understand",
        authorId: 2,
      },
    });
    const azaIntention = await prisma.intention.create({
      data: {
        intention: "What is a cue?",
        cue1: "I don't quite understand",
        cue2: "I don't quite understand",
        cue3: "I don't quite understand",
        authorId: 3,
      },
    });
    const kennadyIntention = await prisma.intention.create({
      data: {
        intention: "What is a cue?",
        cue1: "I don't quite understand",
        cue2: "I don't quite understand",
        cue3: "I don't quite understand",
        authorId: 4,
      },
    });
    const kendallIntention2 = await prisma.intention.create({
      data: {
        intention: "What is a cue?",
        cue1: "I don't quite understand",
        cue2: "I don't quite understand",
        cue3: "I don't quite understand",
        authorId: 1,
      },
    });
    const kennadyIntention2 = await prisma.intention.create({
      data: {
        intention: "What is a cue?",
        cue1: "I don't quite understand",
        cue2: "I don't quite understand",
        cue3: "I don't quite understand",
        authorId: 4,
      },
    });
  
    return {
      questionArray: [kendallIntention, calvinIntention, azaIntention, kennadyIntention, kennadyIntention2, kendallIntention2],
      questions: {
        kendallIntention,
        calvinIntention,
        azaIntention,
        kennadyIntention,
        kennadyIntention2,
        kendallIntention2
      },
    };
  }

export async function seedThreeToOne() {
  const kendallThreeToOne = await prisma.threeToOne.create({
    data: {
      worked1: "What is a cue?",
      worked2: "What is a cue?",
      worked3: "What is a cue?",
      improve1: "finish changing words",
      authorId: 1,
    },
  });
  const kennadyThreeToOne = await prisma.threeToOne.create({
    data: {
      worked1: "What is a cue?",
      worked2: "What is a cue?",
      worked3: "What is a cue?",
      improve1: "finish changing words",
      authorId: 4,
    },
  });
  const calvinThreeToOne = await prisma.threeToOne.create({
    data: {
      worked1: "What is a cue?",
      worked2: "What is a cue?",
      worked3: "What is a cue?",
      improve1: "finish changing words",
      authorId: 2,
    },
  });
  const azaThreeToOne = await prisma.threeToOne.create({
    data: {
      worked1: "What is a cue?",
      worked2: "What is a cue?",
      worked3: "What is a cue?",
      improve1: "finish changing words",
      authorId: 3,
    },
  });
  const michelleThreeToOne = await prisma.threeToOne.create({
    data: {
      worked1: "What is a cue?",
      worked2: "What is a cue?",
      worked3: "What is a cue?",
      improve1: "finish changing words",
      authorId: 5,
    },
  });
  const michelleThreeToOne2 = await prisma.threeToOne.create({
    data: {
      worked1: "What is a cue?",
      worked2: "What is a cue?",
      worked3: "What is a cue?",
      improve1: "finish changing words",
      authorId: 5,
    },
  });

  return {
    questionArray: [kendallThreeToOne, kennadyThreeToOne, calvinThreeToOne, azaThreeToOne, michelleThreeToOne, michelleThreeToOne2],
    questions: {
      kendallThreeToOne,
      kennadyThreeToOne,
      calvinThreeToOne,
      azaThreeToOne,
      michelleThreeToOne,
      michelleThreeToOne2,
    },
  };
};