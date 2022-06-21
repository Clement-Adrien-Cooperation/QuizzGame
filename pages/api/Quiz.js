const client = require("../../data/database");

class Quizz {

  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    };
  };

  //############# Quizz for all user #################

  static async findAll() {
    try {
      const { rows } = await client.query(`SELECT * FROM quizz;`);
      return rows.map((row) => new Quizz(row));
    } catch (error) {
      throw error;
    };
  };

  static async findOne(id) {
    try {
      const { rows } = await client.query(`SELECT * FROM quizz WHERE id=$1;`, [id]);
      if (!rows[0]) {
        throw new Error("Quizz not found");
      }
      return new Quizz(rows[0]);
    } catch (error) {
      throw error;
    };
  };

  static async findAdminQuizz() {
    try {
      const { rows } = await client.query(
        `SELECT *
        FROM quizz
        WHERE user_id = 1;`
      );
      return rows.map((row) => new Quizz(row));
    } catch (error) {
      throw error;
    };
  };

  // static async findBestsQuizz() {
  //   try {
  //     const { rows } = await client.query(
  //       `SELECT *
  //       FROM quizz
  //       WHERE`
  //     );
  //     return rows.map((row) => new Quizz(row));
  //   } catch (error) {
  //     throw error;
  //   };
  // };

  static async findRandomQuizz(nb) {
    const queryDb = {
      text: `SELECT * FROM quizz ORDER BY random() LIMIT $1;`,
      values: [nb]
    };
    try {
      const { rows } = await client.query(queryDb);
      return rows.map((row) => new Quizz(row));
    } catch (error) {
      throw error;
    };
  };

  //#######################################################

  //################ Quizz for user ####################

  static async findUserQuizz(id) {
    try {
      const { rows } = await client.query(
        `SELECT * FROM quizz WHERE user_id=$1;`,
        [id]
      );
      return rows.map((row) => new Quizz(row));
    } catch (error) {
      throw error;
    };
  };

  //#######################################################

  //############# POST for connected user #################

  // async save() {
  //   const queryDb = setQuerySave(this, "quizz");
  //   try {
  //     await client.query(queryDb);
  //     return true;
  //   } catch (error) {
  //     throw error;
  //   };
  // };

  static async delete(id) {
    try {
      await client.query('DELETE FROM "quizz" WHERE id=$1', [id]);
      return true;
    } catch (error) {
      throw error;
    };
  };
};

module.exports = Quizz;