import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Image from '../../components/Image/Image';
import Table from 'components/Table/Table';
function Subject() {

    /*
    const showComponent = () {
        // ...code
    }
*/
    let [isUpdate, setIsUpdate] = useState(false);
    const [liste, setListe] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editClass, setEditClass] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}School/Subject/read`)
            .then(response => {
                setListe(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [isUpdate]);


    const handleEditIndex = (index, sub) => {
        setEditIndex(index);
        setEditClass(sub);
    };



    const handleFormSubmit = (event) => {
        event.preventDefault();
        const subjectName = event.target.subjectName.value;
        // Check if subjectName already exists in the list
        const subjectNameExists = liste.some(element => element.subjectName === subjectName);
        if (subjectNameExists) {
            alert('Subject already exists in the list');
            return;
        }
        // create a new item object from the form data
        const newItem = {
            "subjectName": event.target.subjectName.value,
            "gradeAverage": event.target.gradeAverage.value,
            "numberStudents": event.target.numberStudents.value,
            "teacherNumber": event.target.teacherNumber.value,
        };
        // send the new item to the server using axios
        axios.post(`${process.env.REACT_APP_API_KEY}School/Subject/insert`, newItem)
            .then(response => {
                if (isUpdate) {
                    setIsUpdate(false);
                } else {
                    setIsUpdate(true);
                };

                console.log(isUpdate);
                // add the new item to the list using the setListe function
                //setListe([...liste, newItem]);
                // reset the form fields
                event.target.reset();
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`${process.env.REACT_APP_API_KEY}School/Subject/delete?_id=${id}`)
            .then((response) => {
                if (isUpdate) {
                    setIsUpdate(false);
                } else {
                    setIsUpdate(true);
                };
                console.log(isUpdate);
            })
            .catch((error) => {
                console.log(error);
            });
    };





    const handleEditSubmit = (event) => {
        event.preventDefault();
        const editedItem = {
            subjectName: event.target.subjectName.value,
            gradeAverage: event.target.gradeAverage.value,
            numberStudents: event.target.numberStudents.value,
            teacherNumber: event.target.teacherNumber.value,

        };

        console.log(editClass);
        axios.put(`${process.env.REACT_APP_API_KEY}School/Subject/update/${editClass}`, editedItem)
            .then((response) => {
                if (isUpdate) {
                    setIsUpdate(false);
                } else {
                    setIsUpdate(true);
                };
                console.log(isUpdate);
                setEditIndex(null)
                setEditClass(null)
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div>

            <h1>Subject :</h1>
            <Image image="subject" />
            <form onSubmit={handleFormSubmit}>
                <Table stateClass={"create"} length={4}
                    title1="Subject" type1="text" name1="subjectName"
                    title2="Grade Average" type2="number" min2={0} max2={20} name2="gradeAverage"
                    title3="Number of Students" type3="number" min3={0} max3={100} name3="numberStudents"
                    title4="Number of Teachers" type4="number" name4="teacherNumber" min4={0} max4={10}
                />

            </form>

            <ul className="list-group">
                {liste.map((element, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <form onSubmit={handleEditSubmit}>

                                <Table stateClass={"endUpdate"} length={4}
                                    title1="Subject" type1="text" name1="subjectName" data1={element.subjectName}
                                    title2="Grade Average" type2="number" min2={0} max2={20} name2="gradeAverage" data2={element.gradeAverage}
                                    title3="Number of Students" type3="number" min3={0} max3={100} name3="numberStudents" data3={element.numberStudents}
                                    title4="Number of Teachers" type4="number" name4="teacherNumber" data4={element.teacherNumber} min4={0} max4={10}
                                    onClick1={null} onClick2={() => setEditIndex(null)}
                                />
                            </form>
                        ) : (
                            <>

                                <Table stateClass={"startUpdate"} length={4}
                                    title1="Subject" data1={element.subjectName}
                                    title2="Grade Average" data2={element.gradeAverage}
                                    title3="Number of Students" data3={element.numberStudents}
                                    title4="Number of Teachers" data4={element.teacherNumber}
                                    onClick1={() => handleEditIndex(index, element.subjectName)} onClick2={() => handleDelete(element._id)}
                                />
                            </>
                        )}
                    </li>
                ))}
            </ul>


        </div >
    );
}


export default Subject;