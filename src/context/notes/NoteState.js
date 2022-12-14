import React, { useState } from 'react';
import NoteContext from './NoteContext'

const NoteState = (props) => {
  const host = 'http://localhost:4000'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Add a Note Add a Note Add a Note Add a Note Add a Note Add a Note Add a Note Add a Note Add a Note
  const addNote = async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json()
    setNotes(notes.concat(note))
  }

  //Get All Notes Get All Notes Get All Notes Get All Notes Get All Notes Get All Notes Get All Notes
  const getNotes = async () => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  //Delete Note Delete Note Delete Note Delete Note Delete Note Delete Note Delete Note
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    const json = await response.json()
    console.log(json)

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit Note Edit Note Edit Note Edit Note Edit Note Edit Note Edit Note Edit Note
  const editNote = async (id, title, description, tag) => {
    //Call api

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json()
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break
      }
    }
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;