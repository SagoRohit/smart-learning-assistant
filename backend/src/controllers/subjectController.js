const pool = require("../config/db");

const getAllSubjects = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM subjects ORDER BY name ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllSubjects };