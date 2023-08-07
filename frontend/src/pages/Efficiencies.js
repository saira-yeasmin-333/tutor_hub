import React, { useEffect, useState } from 'react';
import RetrieveEfficiencies from '../components/Profile/RetrieveEfficiencies';

const Efficiencies = ({id, role}) => {
    const str2 = "teacher"
    role = {role}
    id = {id}
    const areEqual = role.role === str2;

    useEffect(() => {
        console.log(id)
    }, []);
    
    if (areEqual) {
        return (
                <div>
                    <RetrieveEfficiencies id={id.id} />
                </div>
            );
        } else {
        return null; // or you can return an empty string, <></>, or any other element you want
        }


};

export default Efficiencies;