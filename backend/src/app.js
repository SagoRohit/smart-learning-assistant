const express = require("express");
const cors = require("cors");

const subjectRoutes = require("./routes/subjectRoutes");
const caseRoutes = require("./routes/caseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/subjects", subjectRoutes);
app.use("/api/cases", caseRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});