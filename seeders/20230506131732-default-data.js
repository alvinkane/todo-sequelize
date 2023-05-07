"use strict";
const bcrypt = require("bcryptjs");
const SEED_USER = {
  name: "root",
  email: "root@example.com",
  password: "12345678",
};

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface
//       .bulkInsert(
//         "Users",
//         [
//           {
//             name: SEED_USER.name,
//             email: SEED_USER.email,
//             password: bcrypt.hashSync(
//               SEED_USER.password,
//               bcrypt.genSaltSync(10),
//               null
//             ), //同步的作法
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           },
//         ],
//         {}
//       )
//       .then((userId) => {
//         console.log(userId);
//         queryInterface.bulkInsert(
//           "Todos",
//           Array.from({ length: 10 }).map((_, i) => ({
//             name: `name-${i}`,
//             UserId: userId,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           }))
//         );
//       });
//   },

//   down: (queryInterface, Sequelize) => {
//     return queryInterface
//       .bulkDelete("Todos", null, {})
//       .then(() => queryInterface.bulkDelete("Users", null, {}));
//   },
// };

// async/await版本
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const userId = await queryInterface.bulkInsert(
        "Users",
        [
          {
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: bcrypt.hashSync(
              SEED_USER.password,
              bcrypt.genSaltSync(10),
              null
            ), //同步的作法
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
      await queryInterface.bulkInsert(
        "Todos",
        Array.from({ length: 10 }).map((_, i) => ({
          name: `name-${i}`,
          UserId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );
    } catch (error) {
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("Todos", null, {});
      await queryInterface.bulkDelete("Users", null, {});
    } catch (error) {
      throw err;
    }
  },
};
