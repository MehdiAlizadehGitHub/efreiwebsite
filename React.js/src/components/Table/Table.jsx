import Button from '../Button/Button';
import React from 'react';
import "./Table.css"

const Table = (props) => {

    if (props.stateClass === "endUpdate") {
        return (
            <table className='table text-white '>
                <tbody>
                    <tr>

                        {Array.from({ length: props.length }).map((_, index) => (
                            <td className="responsive" key={index}>
                                {props["dropdown" + (index + 1)] === "x" ? (
                                    <>
                                        <label>{props["title" + (index + 1)]}</label>
                                        <select name={props["name" + (index + 1)]} defaultValue={props["data" + (index + 1)]} className="btn btn-secondary">
                                            {props["list" + (index + 1)].map((element, i) => (
                                                <option key={i} value={element[props["name" + (index + 1)]]}>
                                                    {element[props["name" + (index + 1)]]}
                                                </option>
                                            ))}
                                            <option value={props["defaultValue" + (index + 1)]}>
                                                {props["defaultValue" + (index + 1)]}
                                            </option>
                                        </select>
                                    </>
                                ) : (
                                    <label>
                                        {props["title" + (index + 1)]}:
                                        <input
                                            type={props["type" + (index + 1)]}
                                            name={props["name" + (index + 1)]}
                                            min={props["min" + (index + 1)]}
                                            max={props["max" + (index + 1)]}
                                            className="form-control"
                                            defaultValue={props["data" + (index + 1)]}
                                            required />
                                    </label>
                                )}
                            </td>
                        ))}

                        <td>
                            <Button text="Enregistrer" onClick={props.onClick1} />
                        </td>
                        <td>
                            <Button text="Annuler" onClick={props.onClick2} />
                        </td>
                    </tr>
                </tbody>

            </table>
        );

    } else if (props.stateClass === "create") {
        return (
            <table className='table text-white'>
                <thead>
                    <tr>
                        {Array.from({ length: props.length }).map((_, index) => (
                            <th className="responsive" key={index}>
                                {props["dropdown" + (index + 1)] === "x" ? (
                                    <>
                                        <label>{props["title" + (index + 1)]}</label>
                                        <select name={props["name" + (index + 1)]} className="btn btn-secondary">
                                            {props["list" + (index + 1)].map((element, i) => (
                                                <option key={i} value={element[props["name" + (index + 1)]]}>
                                                    {element[props["name" + (index + 1)]]}
                                                </option>
                                            ))}

                                            <option value={props["defaultValue" + (index + 1)]}>
                                                {props["defaultValue" + (index + 1)]}
                                            </option>
                                        </select>
                                    </>
                                ) : (
                                    <label>
                                        {props["title" + (index + 1)]}:
                                        <input
                                            type={props["type" + (index + 1)]}
                                            name={props["name" + (index + 1)]}
                                            min={props["min" + (index + 1)]}
                                            max={props["max" + (index + 1)]}
                                            className="form-control"
                                            defaultValue={props["defaultValue" + (index + 1)]}
                                            required
                                        />
                                    </label>
                                )}
                            </th>
                        ))}


                        <th>
                            <Button text="Ajouter" onClick={undefined} />
                        </th>
                    </tr>
                </thead>

            </table >
        )
    } else {
        return (
            <table className='table text-white '>
                <tbody>
                    <tr>
                        {Array.from({ length: props.length }).map((_, index) => (
                            <td className="responsive" key={index}>
                                <label className='result'>
                                    {props["title" + (index + 1)]}:
                                    {"  "}
                                    <span>{props["data" + (index + 1)]}</span>

                                </label>
                            </td>
                        ))}

                        <td>
                            <Button text="Modifier" onClick={props.onClick1} />
                        </td>
                        <td>
                            <Button text="Supprimer" onClick={props.onClick2} />
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }


};

export default Table;