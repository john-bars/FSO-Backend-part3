const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());

app.use(morgan("combined"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const numberOfContacts = persons.length;
  const date = Date();
  res.send(
    `<p>Phonebook has info for ${numberOfContacts} people.<br/>${date}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

/* app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const contacts = persons.map((person) => person.id !== id && person);
  res.json(contacts);
}); */

app.delete("/api/persons/:id", (req, res) => {
  res.status(204).end();
});
app.delete("/api/persons/:number", (req, res) => {
  res.status(204).end();
});

const generateID = () => {
  let randomNumber = Math.floor(Math.random() * 100 + 1);
  return randomNumber;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body);

  !body.name &&
    res.status(400).json({
      error: "name missing",
    });

  !body.number &&
    res.status(400).json({
      error: "number missing",
    });

  persons.some((person) => person.name === body.name) &&
    res.status(409).json({
      error: `${body.name} already exist.`,
    });

  const person = {
    id: generateID(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT);
