import React, { useState } from "react";

import Class from "../collection/Class/Class.jsx";
import Students from "../collection/Students/Students.jsx";
import Grade from "../collection/Grade/Grade.jsx";
import Teacher from "../collection/Teacher/Teacher.jsx";
import Subject from "../collection/Subject/Subject.jsx";


const ShowAndHide = () => {
    const collections = ["Classes", "Students", "Subject", "Teacher", "Grade"];
    const [myCollection, setMyCollection] = useState("");

    return (
        <>
            <div className="carre container-xl">
                <div className="row w-100">
                    <div className="col mb-3 col-12 text-center">
                        <h2 className="sparkle u-hover--sparkle">Select the collection</h2>
                        <br />
                        <div>
                            {collections.map(collections => (
                                <button
                                    type="button"
                                    key={collections}
                                    className={"btn btn-light border-dark "}
                                    onClick={() => setMyCollection(collections)}
                                >
                                    {collections.toLocaleUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="col text-center">

                        {myCollection === "Students" && (
                            <Students />
                        )}

                        {myCollection === "Classes" && (
                            <Class />
                        )}

                        {myCollection === "Teacher" && (
                            <Teacher />
                        )}

                        {myCollection === "Grade" && (
                            <Grade />
                        )}

                        {myCollection === "Subject" && (
                            <Subject />
                        )}
                        
                    </div>
                </div>
            </div>
        </>

    );
};

export default ShowAndHide;
