const fs = require("fs");
const path = require("path");

//read note
// function getAllNotes();

//creates note
function createNote(body, notesArray) {
  const note = body;
  //add note to array
  notesArray.push(note);
  


  //updates page with note
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(
      {
        notes: notesArray,
      },
      null,
      2
    )
  );
  return note;
}
// finds specific note by ID from notes array
const findById = (id, notesArray) => {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
};

// edits existing note
const editNote = (editedNote, notesArray) => {
  // gets index of note to be edited
  const index = notesArray.findIndex(note => note.id === editedNote.id);

  // removes old note, inserts revised note
  notesArray.splice(index, 1);
  notesArray.splice(index, 0, editedNote);

  // rewrites db.json with revised note
  fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
  )
};
//removes selected note
function deleteNote(notesArray, id) {
  //removes deleted note by selected id
  let deletedId = parseInt(id);
  notesArray.splice(deletedId, 1);

  //updates index on notes left in array
  for (let i = deletedId; i < notesArray.length; i++) {
    notesArray[i].id = i.toString();
  }

  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(
      {
        notes: notesArray,
      },
      null,
      2
    )
  );
}

module.exports = { createNote, findById, editNote, deleteNote };
