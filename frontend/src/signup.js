import { useState } from "react";
import axios from 'axios';
import { setLoading, showError, showSuccess, showToast } from "./App";
import {useNavigate} from 'react-router-dom';
function Signup (){

    const [name, setName] = useState('');
    const [role, setRole] = useState('student');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isOnlineMedia, setIsOnlineMedia] = useState(false);
    const [isPhysicalMedia, setIsPhysicalMedia] = useState(false);
    const [budget, setBudget] = useState('');
    const [password, setPassword] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'student', // Default role set to 'student'
        isOnlineMedia: role === 'tutor' ? isOnlineMedia : undefined,
        isPhysicalMedia: role === 'tutor' ? isPhysicalMedia : undefined,
        budget: role === 'tutor' ? parseFloat(budget) : undefined,

    })
    const history=useNavigate()
    
    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform signup logic here, e.g., send the form data to a backend server
        const post_body={
          name,
          phone,
          email,
          role,
          password,
          onlineMedia:isOnlineMedia,
          physicalMedia:isPhysicalMedia,
          budget,
          subjectIdsToAssociate:selectedSubjects
        }

        console.log('here ',post_body);
        await axios.post('http://localhost:5000/api/signup',post_body).then(res=>{  
     
        if(!res.data.success){
            showError(res.data.error)
        }else{
            showSuccess("Successfully Registered")
            history('/signin')
        }

        }).catch(err=>{
            console.log(err)
            switch(err.response.status){
                case 409:
                    showToast('User already exists')
                    break
                case 500:
                    showToast('Internal server error')
                    break
                default:
                    showToast('Connectvity problem')
            }
        
        })
    };

    const handleSubjectChange = (e) => {
      const subjectId = parseInt(e.target.value);
      if (e.target.checked) {
        setSelectedSubjects([...selectedSubjects, subjectId]);
      } else {
        setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId));
      }
    };

    return (
        <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) =>{ 
              setName(e.target.value)
              console.log(name)
            }} />
          </label>
  
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="teacher">Tutor</option>
            </select>
          </label>
  
          <label>
            Phone:
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
  
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
  
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
  
          {role === 'teacher' && (
            <div>
              <label>
                Online Media:
                <input
                  type="checkbox"
                  checked={isOnlineMedia}
                  onChange={() => setIsOnlineMedia(!isOnlineMedia)}
                />
              </label>
              
              <label>
                Physical Media:
                <input
                  type="checkbox"
                  checked={isPhysicalMedia}
                  onChange={() => setIsPhysicalMedia(!isPhysicalMedia)}
                />
              </label>

          <label className="form-label">
            Choose a Subject:
          </label>

              <div style={{display:'flex'}}>
          <div>
          <label>
        <input
          type="checkbox"
          value="1"
          checked={selectedSubjects.includes(1)}
          onChange={handleSubjectChange}
        />
        biology
      </label>
      <label>
        <input
          type="checkbox"
          value="2"
          checked={selectedSubjects.includes(2)}
          onChange={handleSubjectChange}
        />
        physics
      </label>
      <label>
        <input
          type="checkbox"
          value="3"
          checked={selectedSubjects.includes(3)}
          onChange={handleSubjectChange}
        />
        math
      </label>


      <label>
        <input
          type="checkbox"
          value="4"
          checked={selectedSubjects.includes(4)}
          onChange={handleSubjectChange}
        />
        chemistry
      </label>

          </div>
        </div>
  
              <label>
                Budget:
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </label>
            </div>
          )}
  
          <button type="submit">Sign Up</button>
        </form>
      </div>
  
    )
}

export default Signup