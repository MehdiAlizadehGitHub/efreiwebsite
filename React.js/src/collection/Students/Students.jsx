import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Image from '../../components/Image/Image';
import Table from '../../components/Table/Table';
function Students() {

    /*
    const showComponent = () {
        // ...code
    }
*/
    let [isUpdate, setIsUpdate] = useState(false);
    const [liste, setListe] = useState([]);
    const [classList, setClassList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editClass, setEditClass] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:3020/School/Students/read')
            .then(response => {
                setListe(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [isUpdate]);


    useEffect(() => {
        const delay = setTimeout(() => {
            axios.get('http://127.0.0.1:3020/School/Class/read')
                .then(response2 => {
                    setClassList(response2.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }, 20); // Delay of 20 msecond
        return () => clearTimeout(delay); // Clean up the timeout when the component unmounts
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
            "name": event.target.name.value,
            "lastname": event.target.lastname.value,
            "class": event.target.class.value,
            "email": event.target.email.value,
            "age": event.target.age.value,
        };
        // send the new item to the server using axios
        axios.post('http://127.0.0.1:3020/School/Students/insert', newItem)
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
        axios.delete(`http://127.0.0.1:3020/School/Students/delete?_id=${id}`)
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
            "name": event.target.name.value,
            "lastname": event.target.lastname.value,
            "class": event.target.class.value,
            "email": event.target.email.value,
            "age": event.target.age.value,
        };


        console.log(editClass);
        axios.put(`http://127.0.0.1:3020/School/Students/update/${editClass}`, editedItem)
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

            <h1>Students :</h1>
            <Image image="students" />

            <form onSubmit={handleFormSubmit}>



                <Table stateClass={"create"} length={5}
                    title1="Name" type1="text" name1="name"
                    title2="Last Name" type2="text" name2="lastname"
                    title3="Email" type3="email" name3="email"
                    dropdown4="x" list4={classList} title4="Class" name4="class" defaultValue4="No Class"
                    title5="Age" type5="number" min5={0} max5={60} name5="age"
                />
            </form>


            <ul className="list-group">
                {liste.map((element, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <form onSubmit={handleEditSubmit}>

                                <Table stateClass={"endUpdate"} length={5}
                                    title1="Name" name1="name" data1={element.name}
                                    title2="Last Name" name2="lastname" data2={element.lastname}
                                    title3="Email" name3="email" data3={element.email} type3="email"
                                    dropdown4="x" list4={classList} title4="Class" name4="class" data4={element.class} type4="text" defaultValue4="No Class"
                                    title5="Age" name5="age" data5={element.age} type5="number" min5={0} max5={60}
                                    onClick1={null} onClick2={() => setEditIndex(null)}
                                />

                            </form>
                        ) : (
                            <>
                                <Table stateClass={"startUpdate"} length={6}
                                    title1="Student's ID" data1={element._id}
                                    title2="Name" data2={element.name}
                                    title3="Last Name" data3={element.lastname}
                                    title4="Email" data4={element.email}
                                    title5="Class" data5={element.class}
                                    title6="Age" data6={element.age} min6={0} max6={60}
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


export default Students;