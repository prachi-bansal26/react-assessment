import React, { useState } from "react";

const Student = ({ image, fname, lname, email, company, skill, grades, avg, addTagInList, tags }) => {
    const [isActive, setActive] = useState(false);
    const handleToggle = () => {
        setActive(!isActive);
    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            let val = e.target.value;
            e.target.value = "";
            addTagInList(val);
        }
    }
    return(
        <div className="border-bottom">
            <div className="row g-0">
                <div className="col-md-2 text-center my-auto">
                    <img src={image} className="img-thumbnail rounded-circle" width="100" height="100"/>
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h4 className="card-title text-uppercase">{fname} {lname}</h4>
                        <p className="card-text p-2">Email: {email}<br/>
                        Company: {company}<br/>
                        Skill: {skill}<br/>
                        Average: {avg}%</p>
                        <div className={isActive ? 'd-block' : 'd-none'}>
                            {grades.map((grade, index) => (
                                    <p>Test{index}: {grade}%</p>
                            ))
                            }
                        </div>
                        <div className="tagList my-2">
                            {tags.map(tag => (
                                <span className="badge bg-dark mx-1">{tag}</span>
                            ))}
                        </div>
                        <div className="tagInput">
                        <input
                            type="text"
                            placeholder="Add a tag"
                            className="form-control border-0 border-bottom rounded-0"
                            onKeyDown={handleKeyDown}
                        />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <button className="btn" onClick={handleToggle}><i className={isActive ? "fa fa-minus" : "fa fa-plus"}></i></button>
                </div>
            </div>
        </div>
    );
};

export default Student;


