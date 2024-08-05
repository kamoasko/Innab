const synonyms = {
  javascript: ["js", "java script"],
  react: ["react.js", "reactjs"],
  "data analysis": ["data analytics", "data analyst"],
  python: ["py"],
  java: ["java programming"],
  spring: ["spring framework"],
  "bachelor's": ["bachelors", "bachelor", "bachelor of science", "bsc"],
  "master's": [
    "masters",
    "master",
    "master of science",
    "msc",
    "maste",
    "magistr",
  ],
};

const careerData = [
  {
    skills: ["javascript", "react"],
    experience: 2,
    education: "bachelor's",
    jobTitle: "Frontend Developer",
    salary: 60000,
    growth: "High",
    description:
      "A career as a Frontend Developer is recommended based on your skills and experience.",
  },
  {
    skills: ["python", "data analysis"],
    experience: 3,
    education: "bachelor's",
    jobTitle: "Data Analyst",
    salary: 70000,
    growth: "Medium",
    description:
      "A career as a Data Analyst is recommended based on your skills and experience.",
  },
  {
    skills: ["java", "spring"],
    experience: 4,
    education: "master's",
    jobTitle: "Backend Developer",
    salary: 80000,
    growth: "High",
    description:
      "A career as a Backend Developer is recommended based on your skills and experience.",
  },
  // Add more career data as needed
];

export { careerData, synonyms };
