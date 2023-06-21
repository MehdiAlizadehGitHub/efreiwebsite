import React from 'react';
import ImageClass from "../../image/classroomImage.jpg"
import ImageStudents from "../../image/studentImage.jpg"
import ImageGrade from "../../image/gradeImage.jpg"
import ImageTeacher from "../../image/teacherImage.jpg"
import ImageSubject from "../../image/subjectImage.jpg"


import "./Image.css"

const Image = ({image}) => {
    if(image === "class"){
        return (
            <div>
                <img src={ImageClass} alt="une classe" />
            </div>
        );   
    } else if(image === "students"){
        return (
            <div>
                <img src={ImageStudents} alt="une classe" />
            </div>
        );   
    } else if(image === "grade"){
        return (
            <div>
                <img src={ImageGrade} alt="une classe" />
            </div>
        );   
    } else if(image === "teacher"){
        return (
            <div>
                <img src={ImageTeacher} alt="une classe" />
            </div>
        );   
    } else if( image === "subject"){
        return (
            <div>
                <img src={ImageSubject} alt="une classe" />
            </div>
        );   
    }

};

export default Image;