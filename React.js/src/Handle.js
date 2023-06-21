// import axios from "axios";



// export const handleEditSubmit = (event) => {
//     event.preventDefault();
//     const editedItem = {
//         class: event.target.class.value,
//         gradeAverage: event.target.gradeAverage.value,
//         numberSubject: event.target.numberSubject.value,
//     };

//     console.log(editClass);
//     axios.put(`http://127.0.0.1:3020/School/Class/update/${editClass}`, editedItem)
//         .then((response) => {
//             if (isUpdate) {
//                 setIsUpdate(false);
//             } else {
//                 setIsUpdate(true);
//             };
//             console.log(isUpdate);
//             setEditIndex(null)
//             setEditClass(null)
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// };