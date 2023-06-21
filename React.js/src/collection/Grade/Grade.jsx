import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Image from '../../components/Image/Image';
import Table from 'components/Table/Table';
function Grade() {

    /*
    const showComponent = () {
        // ...code
    }
*/
    let [isUpdate, setIsUpdate] = useState(false);
    const [liste, setListe] = useState([]);
    const [subjectListe, setSubjectListe] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editClass, setEditClass] = useState(null);
    useEffect(() => {
        axios.get('http://127.0.0.1:3020/School/Grades/read')
            .then(response => {
                setListe(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [isUpdate]);

    useEffect(() => {
        const delay = setTimeout(() => {
            axios.get('http://127.0.0.1:3020/School/Students/read')
                .then(response1 => {
                    setStudentList(response1.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }, 20); // Add a delay of 20 msecond 

        return () => clearTimeout(delay); // Clean up the timeout when the component unmounts
    }, [isUpdate]);

    useEffect(() => {
        const delay2 = setTimeout(() => {
            axios.get('http://127.0.0.1:3020/School/Subject/read')
                .then(response2 => {
                    setSubjectListe(response2.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }, 40); // Delay of 20 msecond
        return () => clearTimeout(delay2);
    }, [isUpdate]);


    const handleEditIndex = (index, idStud) => {
        setEditIndex(index);
        setEditClass(idStud);
    };



    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (event.target._id.value === "No Student's ID") {
            alert('Student Id Needs to be selected');
            return;
        }
        // create a new item object from the form data
        const newItem = {
            "idStud": event.target._id.value,
            "grade": event.target.grade.value,
            "subjectName": event.target.subjectName.value,
        };
        console.log(event.target)
        // send the new item to the server using axios
        axios.post('http://127.0.0.1:3020/School/Grades/insert', newItem)
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


    const handleDelete = (idStud) => {
        console.log(idStud)
        axios.delete(`http://127.0.0.1:3020/School/Grades/delete?idStud=${idStud}`)
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
            idStud: event.target._id.value,
            grade: event.target.grade.value,
            subjectName: event.target.subjectName.value,
        };

        console.log(editClass);
        axios.put(`http://127.0.0.1:3020/School/Grades/update/${editClass}`, editedItem)
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

            <h1>Grade :</h1>
            <Image image="grade" />

            <form onSubmit={handleFormSubmit}>

                <Table stateClass={"create"} length={3}
                    dropdown1="x" list1={studentList} title1="Student Id" type1="number" name1="_id" defaultValue1="No Student's ID"
                    title2="Grade" type2="number" min2={0} max2={20} name2="grade"
                    dropdown3="x" list3={subjectListe} title3="Subject Graded" type3="text" name3="subjectName" defaultValue3="No Subject"
                />

            </form>

            <ul className="list-group">
                {liste.map((element, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <form onSubmit={handleEditSubmit}>

                                <Table stateClass={"endUpdate"} length={3}
                                    dropdown1="x" list1={studentList} title1="Student's ID" name1="_id" data1={element.idStud} type1="text" defaultValue1="No Student's ID"
                                    title2="Grade" name2="grade" data2={element.grade} type2="number" min2={0} max2={20}
                                    dropdown3="x" list3={subjectListe} title3="Subject Graded" name3="subjectName" data3={element.subjectName} type3="text" defaultValue3="No Subject"
                                    onClick1={null} onClick2={() => setEditIndex(null)}
                                />;


                            </form>
                        ) : (
                            <>
                                <Table stateClass={"startUpdate"} length={3}
                                    title1="Student's ID" data1={element.idStud}
                                    title2="Grade" data2={element.grade}
                                    title3="Subject Graded" data3={element.subjectName}
                                    onClick1={() => handleEditIndex(index, element.idStud)} onClick2={() => handleDelete(element.idStud)}
                                />
                            </>
                        )}
                    </li>
                ))}
            </ul>


        </div >
    );
}


export default Grade;