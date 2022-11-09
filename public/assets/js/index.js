// if(window.location.pathname === '/notes') {
  const noteTitle = document.querySelector('.note-title');
  const noteText = document.querySelector('.note-textarea');
  const saveNoteBtn = document.querySelector('.save-note');
  const newNoteBtn = document.querySelector('.new-note');
  const noteList = document.querySelectorAll('.list-container .list-group');
  // };
  
  // Show an element
  const show = (elem) => {
    elem.style.display = 'inline';
  };

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  // }).then(response => {
  //   if(!response.ok) {
  //     return alert('Error: ' +response.statusText);
  //   }
  //   console.log(response.json());
  //   return response.json();
  })
  .then(notes => {
    console.log(notes);
    renderNoteList(notes);
  });


  //saves note
const saveNote = (note) =>
fetch('/api/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(note),
}).then((response)=> {
  if(response.ok) {
    return response.json();
  } else {
    alert('Error: ' + response.statusText);
  }
  });

  //deletes note selected
  const deleteNote = (id) =>
  fetch('/api/notes/'+ `${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
//displays note
  const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('data-id', activeNote.id);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute('data-id');
    noteTitle.value = '';
    noteText.value = '';
  }
};

//saves note after entry
const handleNoteSave = () => {
  let newNote;
  let noteId= noteTitle.getAttribute('data-id');

  if (noteId) {
    newNote = {
      title: noteTitle.value,
      text: noteText.value,
      id: noteId
    };
  } else {
    newNote = {
     title: noteTitle.value,
     text: noteText.value
    };
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-id')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.getAttribute('data-id'));
  renderActiveNote();
};

// Sets the activeNote to an empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

//displays the add note button or removes it if the note ws previously saved
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  // let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');
    liEl.addEventListener('click', handleNoteView);

    const spanEl = document.createElement('span');
    spanEl.innerText = text;

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (notes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  notes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click',handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

// getAndRenderNotes();
getNotes();