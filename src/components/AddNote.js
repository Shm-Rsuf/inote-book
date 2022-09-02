import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: '', description: '', tag: '' })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: '', description: '', tag: '' })
        props.showAlert('Added Successfully', 'success')
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h2 className='my-2'>Add Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title}onChange={onChange} minLength={4} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" aria-describedby="emailHelp" value={note.description}onChange={onChange} minLength={4} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" value={note.tag}onChange={onChange} minLength={4} required />
                </div>
                <button disabled={note.title.length < 4 || note.description.length < 4} type="submit" className="btn btn-info" onClick={handleClick}>Add Note</button>
            </form>

        </div>
    )
}

export default AddNote
