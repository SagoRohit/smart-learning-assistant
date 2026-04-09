const pool = require("../config/db");

const getAllCases = async (req, res) => {
  try {
    const { subject_id } = req.query;

    let query = `
      SELECT cases.*, subjects.name AS subject_name
      FROM cases
      JOIN subjects ON cases.subject_id = subjects.id
    `;

    const params = [];

    if (subject_id) {
      query += " WHERE cases.subject_id = $1";
      params.push(subject_id);
    }

    query += " ORDER BY cases.id DESC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const caseResult = await pool.query(
      `
      SELECT cases.*, subjects.name AS subject_name
      FROM cases
      JOIN subjects ON cases.subject_id = subjects.id
      WHERE cases.id = $1
      `,
      [id]
    );

    if (caseResult.rows.length === 0) {
      return res.status(404).json({ message: "Case not found" });
    }

    const stepsResult = await pool.query(
      "SELECT * FROM case_steps WHERE case_id = $1 ORDER BY step_number ASC",
      [id]
    );

    const quizResult = await pool.query(
      "SELECT * FROM quiz_questions WHERE case_id = $1",
      [id]
    );

    res.json({
      case: caseResult.rows[0],
      steps: stepsResult.rows,
      quiz: quizResult.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllCases, getCaseById };