import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RetrieveEfficiencies = ({id}) => {
    
    id = {id}
    const [efficiences,setEfficiencies] = useState(null)

    useEffect(() => {
        console.log(id)
    }, []);
    
    return (
        <div>
            <p>Teacherrrrr</p>
        </div>
    );


};

export default RetrieveEfficiencies;