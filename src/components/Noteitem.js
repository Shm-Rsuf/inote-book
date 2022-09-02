import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props
    return (
        <div className='col-md-4'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);props.showAlert('Deleted Successfully', 'success')}} />
                    <i className="fa-solid fa-user-pen mx-2" onClick={()=>{updateNote(note)}} />
                </div>
            </div>
        </div>
    )
}

export default Noteitem
