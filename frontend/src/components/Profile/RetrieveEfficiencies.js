import React, { useEffect, useState } from 'react';
import axios from 'axios';
import{setLoading} from '../../App'
import Efficiencies from '../../pages/Efficiencies';

const RetrieveEfficiencies = ({id}) => {
    
    id = {id}
    const [efficiencies,setEfficiencies] = useState(null)
    const [tutor,setTutor]=useState(null)
    

    
    const fetchTutorData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/fetch-tutor/${id.id}`);
          setTutor(response.data.data);
          console.log('Tutor ID:', response.data.data.teacher_id);
      
          const response2 = await axios.get(`http://localhost:5000/api/get-efficiency-by-account/${response.data.data.teacher_id}`);
          setEfficiencies(response2.data.data);
          console.log('Efficiencies:', response2.data.data);
          console.log(typeof efficiencies)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      useEffect(() => {
        fetchTutorData();
      }, [id.id]); // Make sure to add id.id as a dependency if it can change during component's life cycle
      
    
    return (
        <div>
            <p style={{ display: 'inline' }}>Efficiencies: </p>
                        {efficiencies && efficiencies.map((effs) => (
                    <p key={effs.id} style={{ display: 'inline' }}> {effs.sub_name} </p>
                ))} 
        </div>
    );


};

export default RetrieveEfficiencies;