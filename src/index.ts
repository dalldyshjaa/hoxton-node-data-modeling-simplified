import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const db = Database("./db/data.db", { verbose: console.log });
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("hi");
});

const getApplicant = db.prepare(`SELECT * FROM applicants WHERE id = @id;`);

const getApplicantDetails = db.prepare(
  `SELECT * FROM interviews JOIN interviewers ON interviews.interviewerID = interviewers.id WHERE interviews.applicantID = @id;`
);

const getInterviewer = db.prepare(`SELECT * FROM interviewers WHERE id = @id;`);

const getInterviewerDetails = db.prepare(
  `SELECT * FROM interviews JOIN applicants ON interviews.applicantID = applicants.id WHERE interviews.interviewerID = @id;`
);

const createApplicant = db.prepare(`
    INSERT INTO applicants (name, email) VALUES (@name, @email);
`);

const createInterviewer = db.prepare(`
    INSERT INTO interviewers (name, email) VALUES (@name, @email);
`);

const createInterview = db.prepare(`
    INSERT INTO interviews (date, score, applicantID, interviewerID, position, success) VALUES (@date, @score, @applicantID, @interviewerID, @position, @success);
`);

const createEmmployee = db.prepare(`INSERT INTO emmployees (
   name, email, position, companyID
  ) VALUES (@name, @email, @position, @companyID);`);

app.get("/applicants/:id", (req, res) => {
  const applicant = getApplicant.get({ id: req.params.id });
  applicant.interviews = getApplicantDetails.all({ id: req.params.id });
  res.send(applicant);
});

app.get("/interviewers/:id", (req, res) => {
  const interviewer = getInterviewer.get({ id: req.params.id });
  interviewer.interviews = getInterviewerDetails.all({ id: req.params.id });
  res.send(interviewer);
});

app.post("/applicants", (req, res) => {
  createApplicant.run({ name: req.body.name, email: req.body.email });
  res.send("ok");
});

app.post("/interviewers", (req, res) => {
  createInterviewer.run({ name: req.body.name, email: req.body.email });
  res.send("ok");
});

app.post("/interviews", (req, res) => {
  let emmployee = getApplicant.get({ id: req.body.applicantID });
  let interviewer = getInterviewer.get({ id: req.body.interviewerID });
  if (req.body.success === "true") {
    createEmmployee.run({
      name: emmployee.name,
      email: emmployee.email,
      position: req.body.position,
      companyID: interviewer.companyID,
    });
  }
  res.send(
    createInterview.run({
      date: req.body.date,
      score: req.body.score,
      applicantID: req.body.applicantID,
      interviewerID: req.body.interviewerID,
      position: req.body.position,
      success: req.body.success,
    })
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
