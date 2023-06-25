import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Image from '../../components/Image/Image';
import Table from 'components/Table/Table';
function Teacher() {

    /*
    const showComponent = () {
        // ...code
    }
*/
    let [isUpdate, setIsUpdate] = useState(false);
    const [liste, setListe] = useState([]);
    const [subjectListe, setSubjectListe] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editClass, setEditClass] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}School/Teacher/read`)
            .then(response => {
                setListe(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, [isUpdate]);


    useEffect(() => {
        const delay = setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API_KEY}School/Subject/read`)
                .then(response2 => {
                    setSubjectListe(response2.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }, 20); // Delay of 20 msecond
        return () => clearTimeout(delay);
    }, [isUpdate]);

    const handleEditIndex = (index, email) => {
        setEditIndex(index);
        setEditClass(email);
    };



    const handleFormSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        // Check if email already exists in the list
        const emailExists = liste.some(element => element.email === email);
        if (emailExists) {
            alert('Email already exists in the list');
            return;
        }
        // create a new item object from the form data
        const newItem = {
            "teacherName": event.target.teacherName.value,
            "email": event.target.email.value,
            "subjectName": event.target.subjectName.value,
            "age": event.target.age.value,
        };
        // send the new item to the server using axios
        axios.post(`${process.env.REACT_APP_API_KEY}School/Teacher/insert`, newItem)
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
        axios.delete(`${process.env.REACT_APP_API_KEY}School/Teacher/delete?_id=${id}`)
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
            teacherName: event.target.teacherName.value,
            email: event.target.email.value,
            subjectName: event.target.subjectName.value,
            age: event.target.age.value,
        };

        console.log(editClass);
        axios.put(`${process.env.REACT_APP_API_KEY}School/Teacher/update/${editClass}`, editedItem)
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

            <h1>Teacher :</h1>
            <Image image="teacher" />

            <form onSubmit={handleFormSubmit}>
                <Table stateClass={"create"} length={4}
                    title1="Teacher's Name" type1="text" name1="teacherName"
                    title2="Email" type2="email" name2="email"
                    dropdown3="x" list3={subjectListe} title3="Subject Taught" type3="text" name3="subjectName" defaultValue3="No Subject"
                    title4="Age" type4="number" min={0} max={65} name4="age"
                />

            </form>

            <ul className="list-group">
                {liste.map((element, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <form onSubmit={handleEditSubmit}>

                                <Table stateClass={"endUpdate"} length={4}
                                    title1="Teacher's Name" name1="teacherName" data1={element.teacherName} type1="text"
                                    title2="Email" name2="email" data2={element.email} type2="email"
                                    dropdown3="x" list3={subjectListe} title3="Subject Taught" name3="subjectName" data3={element.subjectName} type3="text" defaultValue3="No Subject"
                                    title4="Age" name4="age" data4={element.age} min4={0} max4={65} type4="number"
                                    onClick1={null} onClick2={() => setEditIndex(null)}
                                />

                            </form>
                        ) : (
                            <>
                                <Table stateClass={"startUpdate"} length={4}
                                    title1="Teacher's Name" data1={element.teacherName}
                                    title2="Email" data2={element.email}
                                    title3="Subject Taught" data3={element.subjectName}
                                    title4="Age" data4={element.age}
                                    onClick1={() => handleEditIndex(index, element.email)} onClick2={() => handleDelete(element._id)}
                                />
                            </>
                        )}
                    </li>
                ))}
            </ul>


        </div >
    );
}


export default Teacher;