import { clearDb } from "./clearDb";
import { seedIntentions, seedQuestions, seedThreeToOne, seedUsers } from "./seedApp";

async function seedDatabase() {
  try {
    await clearDb();
    await seedUsers();
    await seedQuestions();
    await seedIntentions();
    await seedThreeToOne();
    console.log("seeded 🌱");
  } catch (e) {
    console.error("error seeding 🌱");
    console.error(e);
  }
}

seedDatabase();
