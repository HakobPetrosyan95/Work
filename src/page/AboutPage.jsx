import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function AboutPage() {
  const [user, setUser] = useState({
    Name: '', Email: '', Role: '', Status: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadingData();
  }, [])

  const loadingData = async () => {
    const res = await axios.get(`http://localhost:3000/users/${id}`);
    setUser(res.data);
  }

  return (
    <div className='AboutPage'>
        <button className='goBack' onClick={() => navigate(-1)}>Go back</button>
    
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr key={user.id}>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Role}</td>
                <td>{user.Status}</td>
            </tr>



        </tbody>
    </table>


</div>
  )
}
