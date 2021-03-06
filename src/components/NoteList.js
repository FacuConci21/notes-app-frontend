import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export default class NoteList extends Component {

    state = {
        notes: []
    }

    async getNotes(){
        const resp = await axios.get('http://localhost:4000/api/notes');
        this.setState({ notes: resp.data });
    }

    componentDidMount(){
        this.getNotes();
    }

    deleteNote = async (id)=>{
        await axios.delete(`http://localhost:4000/api/notes/${id}`);
        this.getNotes(); 
    }


    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h4> {note.title} </h4>
                                    <Link className="btn btn-secondary" to={`/edit/${note._id}`}>
                                        edit
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <h6> {note.content} </h6>
                                    <p> {note.author} </p>
                                    <p> {format(note.date)} </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={()=> this.deleteNote(note._id)}>
                                        del
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
