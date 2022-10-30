const fs = require("fs");
const path = require("path");

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
}

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

module.exports = { createNote, deleteNote };
