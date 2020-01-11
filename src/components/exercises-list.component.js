import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FontAwesome from 'react-fontawesome'
import faStyles from 'font-awesome/css/font-awesome.css'


const Excercise = props => (
    <tr>
      <td>{props.excercise.username}</td>
      <td>{props.excercise.description}</td>
      <td>{props.excercise.duration}</td>
      <td>{props.excercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.excercise._id}><span ><i className="fa fa-pencil"></i></span></Link>  ||  <a href="#" onClick={() => { props.deleteExcercise(props.excercise._id) }}><span ><i className="fa fa-trash"></i></span></a>
      </td>
    </tr>
  )

export default class ExcerciseList extends Component{
    constructor(props){
        super(props);
        this.deleteExcercise = this.deleteExcercise.bind(this);
        this.state={excercises:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/excercises')
            .then(res=>{
                this.setState({excercises:res.data})
            })
            .catch(err=>{
                console.log({message:err})
            })
    }

    excerciseList() {
        return this.state.excercises.map(currentexcercise => {
          return <Excercise excercise={currentexcercise} deleteExcercise={this.deleteExcercise} key={currentexcercise._id}/>;
        })
      }

    deleteExcercise(id) {
        axios.delete('http://localhost:5000/excercises/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          excercises: this.state.excercises.filter(el => el._id !== id)
        })
      }

    render(){
        return(
            <div>
        <h3>Logged Exercises</h3>
        <table className="table table-striped table-dark table-hover ">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.excerciseList() }
          </tbody>
        </table>
      </div>
        )
    }
}