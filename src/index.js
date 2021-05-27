import React, { Component } from "react";
import ReactDOM from "react-dom";
import Student from './components/Student';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "./assets/css/style.css";

class Assessment extends Component {
    state = {
        students: [],
        searchInput: "",
        searchResult: [],
        searchTags: ""
    }
    getStudents = () => {
        fetch('https://api.hatchways.io/assessment/students', {
            method: "GET",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            data.students.map((student) => {
                student['tags'] = [];
            })
            this.setState({
                students: data.students
            })
        });
    };
    
    getAvg = (grades) => {
        let total = 0;
        let len = grades.length;
        grades.forEach(num => {
            total += parseInt(num);
        });
        let avg = total/len;
        return avg;
    }

    componentDidMount() {
        this.getStudents();
    }

    handleSearch1 = event => {
        let stud = this.state.students;
        const inputVal = event.target.value;
        let results = [];
        if(this.state.searchTags != "") {
            stud = this.state.searchResult;            
        }
        
        if(stud.length > 0) {
            results = stud.filter(student =>
                student.firstName.toLowerCase().startsWith(inputVal) || student.lastName.toLowerCase().startsWith(inputVal)
            );
        }
        
        this.setState({
            searchInput: inputVal,
            searchResult: results
        });
    };

    handleSearch2 = event => {
        let stud = this.state.students;
        const inputVal = event.target.value;
        if(this.state.searchInput) {
            stud = this.state.searchResult;
        }
        let results = [];
        if(stud.length > 0) {
            results = stud.filter(student => {
                let addStudArr = false;
                for(let tagStr of student['tags']) {
                    if(tagStr.toLowerCase().includes(inputVal.toLowerCase())) {
                        addStudArr = true;
                    }
                }
                if(addStudArr) {
                    return student;
                }
            });
        }
        
        this.setState({
            searchTags: inputVal,
            searchResult: results
        })
    }

    addTags = (tags, email) => {
        let stud = this.state.students;
        let studentIndex = -1;
        stud.forEach((student, index) => {
            if(student.email === email) {
                //console.log(index);
                studentIndex = index;
            } 
        });
        //console.log(studentIndex);
        if (stud[studentIndex].hasOwnProperty("tags")) {
            let existingTags = {"tags": []};
            existingTags["tags"] = stud[studentIndex]["tags"];
            existingTags["tags"].push(tags);
            stud[studentIndex]["tags"] = existingTags["tags"];
        } 
        this.setState({
            students: stud
        });
    }

    render() {
        let studentArray = this.state.students;
        if(this.state.searchInput != "" || this.state.searchTags != "") {
            studentArray = this.state.searchResult;
        }
        return (
            <div className = "container">
                <div className = "title"> React Assessment</div>
                <div className="studentContainer">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="form-control border-0 border-bottom rounded-0"
                    value={this.state.searchInput}
                    onChange={this.handleSearch1}
                    id="search1"
                />

                <input
                    type="text"
                    placeholder="Search by tag"
                    className="form-control border-0 border-bottom rounded-0"
                    value={this.state.searchTag}
                    onChange={this.handleSearch2}
                    id="search2"
                />

                    {this.state.students.length > 0 &&  
                    studentArray.map(
                        ({city, company, email, firstName, grades, lastName, pic, skill, tags}, index) => ( 
                            <Student key={email}
                            image={pic} fname={firstName} lname={lastName}
                            email={email} company={company}
                            skill={skill} grades={grades} avg={this.getAvg(grades)}
                            addTagInList={tags => this.addTags(tags, email)}
                            tags={tags}
                            />
                            
                        )
                    )}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Assessment />, document.getElementById("root"));