import React from 'react';

const Button = ({text, onClick}) => {
    return (
        <div>
            <button className="btn btn-dark" onClick={onClick}>{text}</button>
        </div>
    );
};

export default Button;