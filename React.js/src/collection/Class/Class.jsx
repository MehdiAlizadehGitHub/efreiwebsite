import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../components/Table/Table';
import React from 'react';
import Image from '../../components/Image/Image';
// import { handleEditSubmit } from 'Handle';

function Class() {

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
        axios.get('http://127.0.0.1:3020/School/Class/read')
            .then(response => {
                setListe(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [isUpdate]);


    const handleEditIndex = (index, classId) => {
        setEditIndex(index);
        setEditClass(classId);
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const className = event.target.class.value;

        const classExist = liste.some(element => element.class === className);
        if (classExist) {
            alert('Class already exists in the list');
            return;
        }
        // create a new item object from the form data
        const newItem = {
            "class": event.target.class.value,
            "gradeAverage": event.target.gradeAverage.value,
            "numberSubject": event.target.numberSubject.value,
        };
        // send the new item to the server using axios
        axios.post('http://127.0.0.1:3020/School/Class/insert', newItem)
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
        axios.delete(`http://127.0.0.1:3020/School/Class/delete?_id=${id}`)
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
            class: event.target.class.value,
            gradeAverage: event.target.gradeAverage.value,
            numberSubject: event.target.numberSubject.value,
        };

        console.log(editClass);
        axios.put(`http://127.0.0.1:3020/School/Class/update/${editClass}`, editedItem)
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
        <div className="all">

            <h1>Classes :</h1>

            <Image image="class" />

            <form onSubmit={handleFormSubmit}>

                <Table stateClass={"create"} length={3}
                    title1="Class" type1="text" name1="class"
                    title2="Grade Average" type2="number" min2={0} max2={20} name2="gradeAverage"
                    title3="Number of Subject" type3="number" min3={0} max3={30} name3="numberSubject"
                />
            </form>

            <ul className="list-group">
                {liste.map((element, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <form onSubmit={handleEditSubmit}>

                                <Table stateClass={"endUpdate"} length={3}
                                    title1="Class" name1="class" data1={element.class} type1="text"
                                    title2="Grade Average" name2="gradeAverage" data2={element.gradeAverage} type2="number" min2={0} max2={20}
                                    title3="Number of Subject" name3="numberSubject" data3={element.numberSubject} type3="number" min3={0} max3={30}
                                    onClick1={null} onClick2={() => setEditIndex(null)}
                                />;

                            </form>

                        ) : (

                            <>

                                <Table stateClass={"startUpdate"} length={3}
                                    title1="Class" data1={element.class}
                                    title2="Grade Average" data2={element.gradeAverage}
                                    title3="Number of Subject" data3={element.numberSubject}
                                    onClick1={() => handleEditIndex(index, element.class)} onClick2={() => handleDelete(element._id)}
                                />

                            </>
                        )}
                    </li>
                ))}
            </ul>


        </div >
    );
}


export default Class;