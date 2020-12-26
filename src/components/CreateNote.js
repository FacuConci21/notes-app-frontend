import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {


    state = {
        users: [],
        userSelected: '',
        date: new Date(),
        title: '',
        content: '',
        editing: false,
        _id: ''
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }
        
        if(this.state.editing){
            await axios.put(`http://localhost:4000/api/notes/${this.state._id}`, newNote);
        }else{
            await axios.post('http://localhost:4000/api/notes', newNote);
        }
        window.location.href = '/';
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:4000/api/users');
        this.setState({ 
            users: resp.data.map( user => user.username ),
            userSelected: resp.data[0].username
        });
        if(this.props.match.params.id){
            const resp = await axios.get(`http://localhost:4000/api/notes/${this.props.match.params.id}`)
            this.setState({
                title: resp.data.title,
                content: resp.data.content,
                date: new Date(resp.data.date),
                userSelected: resp.data.author,
                editing: true,
                _id: this.props.match.params.id
            })
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeDate = date => {
        this.setState({ date });
    }



    render() {
        return (
            <div className="col-md-6">
                <div className="card card-body">
                    <h3>Create Note</h3>
                    <form onSubmit={this.onSubmit}>

                        {/* SELECT USER */}
                        <div className="form-group">
                            <select
                                className='form-control'
                                value={this.state.userSelected}
                                name="userSelected"
                                onChange={this.onInputChange}
                                required
                            >
                                {
                                    this.state.users.map(user => 
                                    <option key={user} value={user} >
                                        {user}
                                    </option> )
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <input 
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="form-control"
                                onChange={this.onInputChange}
                                value={this.state.title}
                                required
                                />
                        </div>

                        <div className="form-group">
                            <textarea 
                                name="content"
                                placeholder='Content'
                                className="form-control"
                                onChange={this.onInputChange}
                                value={this.state.content}
                                required
                                >
                                </textarea>
                        </div>

                        <div className="form-group">
                            <DatePicker 
                                className="form-control"
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            ></DatePicker>
                        </div>

                        <button className='btn btn-primary' type="submit" >
                            Save
                        </button>
                    </form>

                </div>
            </div>
        )
    }
}
