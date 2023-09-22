import { seedUsers } from "./seedApp";

seedUsers()
  .then(() => {
    console.log("seeded 🌱");
  })
  .catch((e) => {
    console.error("error seeding 🌱");
    console.error(e);
  });
