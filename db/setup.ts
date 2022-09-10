import Database from "better-sqlite3";

const db = Database("./db/data.db", { verbose: console.log });

const applicants = [
  {
    name: "Taulant",
    email: "asf@hotmai.com",
    employed: "true",
  },
  {
    name: "Taulant1",
    email: "asf@hotmai1.com",
    employed: "true",
  },
  {
    name: "Taulant2",
    email: "asf@hotmai2.com",
    employed: "false",
  },
  {
    name: "Taulant3",
    email: "asf@hotmai3.com",
    employed: "false",
  },

  {
    name: "Taulant4",
    email: "asf@hotmai4.com",
    employed: "false",
  },
  {
    name: "Taulant5",
    email: "asf@hotmai5.com",
    employed: "false",
  },
];

const interviewers = [
  {
    name: "Salahudin",
    email: "asf@hotmai.com",
    companyID: 1,
  },
  {
    name: "Salahudin1",
    email: "Salahudin1@hotmai.com",
    companyID: 1,
  },
  {
    name: "Salahudin2",
    email: "Salahudin2@hotmail.com.com",
    companyID: 2,
  },
  {
    name: "Salahudin3",
    email: "Salahudin3@hotmail.com.com",
    companyID: 4,
  },
  {
    name: "Salahudin4",
    email: "Salahudin4@hotmai.com",
    companyID: 2,
  },
  {
    name: "Salahudin5",
    email: "Salahudin5@hotmai.com",
    companyID: 3,
  },
];

const interviews = [
  {
    date: "21/03/2003",
    score: 120,
    applicantID: 1,
    interviewerID: 1,
    position: "Full stack",
    success: "true",
  },
  {
    date: "21/03/1998",
    score: 80,
    applicantID: 2,
    interviewerID: 1,
    position: "Accountant",
    success: "false",
  },
  {
    date: "21/03/2010",
    score: 10,
    applicantID: 3,
    interviewerID: 1,
    position: "Networks Manager",
    success: "true",
  },
  {
    date: "21/03/2002",
    score: 120,
    applicantID: 2,
    interviewerID: 3,
    position: "Fashion Designer",
    success: "true",
  },
  {
    date: "21/03/2003",
    score: 80,
    applicantID: 5,
    interviewerID: 2,
    position: "New Queen",
    success: "false",
  },
  {
    date: "21/03/2003",
    score: 98,
    applicantID: 5,
    interviewerID: 4,
    position: "Prime Minister",
    success: "false",
  },
  {
    date: "21/03/2003",
    score: 120,
    applicantID: 5,
    interviewerID: 2,
    position: "Formula 1 driver",
    success: "false",
  },
  {
    date: "21/03/2003",
    score: 30,
    applicantID: 5,
    interviewerID: 5,
    position: "idk",
    success: "true",
  },
];

const companies = [
  {
    name: "Twig",
    city: "Pristina",
  },
  {
    name: "Void",
    city: "Deez",
  },
  {
    name: "Viva",
    city: "Lipjan",
  },
  {
    name: "ZoomProd",
    city: "Lipjan",
  },
];

const dropCompaniesTable = db.prepare(`
DROP TABLE IF EXISTS companies;`);
dropCompaniesTable.run();

const dropEmmployeesTable = db.prepare(`
DROP TABLE IF EXISTS emmployees;
`);
dropEmmployeesTable.run();

const dropApplicantsTable = db.prepare(`
DROP TABLE IF EXISTS applicants;
`);
dropApplicantsTable.run();

const dropInterviewsTable = db.prepare(`
DROP TABLE IF EXISTS interviews;
`);
dropInterviewsTable.run();

const dropInterviewersTable = db.prepare(`
DROP TABLE IF EXISTS interviewers;
`);
dropInterviewersTable.run();

const createCompaniesTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS companies (
        id INTEGER NOT NULL,
        name TEXT NO NULL,
        city TEXT NOT NULL,
        PRIMARY KEY (id)
        );
`);

createCompaniesTable.run();

const createCompany = db.prepare(`
    INSERT INTO companies (name, city) VALUES (@name, @city);
`);

for (let company of companies) {
  createCompany.run(company);
}

const createEmmployeesTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS emmployees (
        id INTEGER NOT NULL,
        companyID INTEGER NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        position TEXT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (companyID) REFERENCES companies(id) ON DELETE CASCADE
        );
`);

createEmmployeesTable.run();

const createEmmployee = db.prepare(`INSERT INTO emmployees (
   name, email, position, companyID
  ) VALUES (@name, @email, @position, @companyID);`);

const createApplicantTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS applicants (
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        PRIMARY KEY (id)
        );
`);

createApplicantTable.run();

const createApplicant = db.prepare(`
    INSERT INTO applicants (name, email) VALUES (@name, @email);
`);

for (let applicant of applicants) {
  createApplicant.run(applicant);
}

const getApplicant = db.prepare(`
SELECT * FROM applicants WHERE id = @id`);

// for (let interview of interviews) {
// }

const createInterviewerTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS interviewers (
        id INTEGER NOT NULL,
        companyID INTEGER NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (companyID) REFERENCES companies(id) ON DELETE CASCADE
        );
`);

createInterviewerTable.run();

const createInterviewer = db.prepare(`
    INSERT INTO interviewers (name, email, companyID) VALUES (@name, @email, @companyID);
`);

for (let interviewer of interviewers) {
  createInterviewer.run(interviewer);
}

const createInterviewTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS interviews (
        id INTEGER NOT NULL,
        interviewerID INTEGER NOT NULL,
        position TEXT NOT NULL,
        applicantID INTEGER NOT NULL,
        date TEXT NOT NULL,
        score INTEGER NOT NULL,
        success TEXT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (interviewerID) REFERENCES interviewers(id) ON DELETE CASCADE ,
        FOREIGN KEY (applicantID) REFERENCES applicants(id) ON DELETE CASCADE
        );
`);

createInterviewTable.run();

const createInterview = db.prepare(`
    INSERT INTO interviews (date, score, applicantID, interviewerID, position, success) VALUES (@date, @score, @applicantID, @interviewerID, @position, @success);
`);

const getInterviewer = db.prepare(`SELECT * FROM interviewers WHERE id = @id;`);

for (let interview of interviews) {
  createInterview.run(interview);
  if (interview.success === "true") {
    let emmployee = getApplicant.get({ id: interview.applicantID });
    let interviewer = getInterviewer.get({ id: interview.interviewerID });
    createEmmployee.run({
      name: emmployee.name,
      email: emmployee.email,
      position: interview.position,
      companyID: interviewer.companyID,
    });
  }
}
