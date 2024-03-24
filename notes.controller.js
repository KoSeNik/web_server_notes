const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.greenBright("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.magentaBright("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.magenta(note.id, note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const filtered = notes.filter((note) => note.id !== id);
  await saveNotes(filtered);
  console.log(chalk.blueBright(`Remove note by id=${id}`));
}

async function editNote(idEdit, resultEditTitle) {
  const notes = await getNotes();

  const index = notes.findIndex((n) => n.id === idEdit);

  if (index >= 0) {
    notes[index] = { ...notes[index], title: resultEditTitle };
    await saveNotes(notes);
    console.log(chalk.blueBright(`Edit note by id=${idEdit}`));
  }
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
