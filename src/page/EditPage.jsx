import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export  function EditPage() {
    const[user,setUser]=useState({
        Name: '', Email: '', Role: '', Status: '',
    })

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(()=>{
        loadingData();
    },[])

    const loadingData = async ()=>{
        const res = await axios.get(`http://localhost:3000/users/${id}`)
        setUser(res.data);
    }

    const onChangeInput = (event)=>{
        const name = event.target.name;
        const value = event.target.value;

        setUser({...user,[name]:value})
    }

    const submitHandler = async (event)=>{
        event.preventDefault();

        await axios.put(`http://localhost:3000/users/${id}`,user);
        navigate(-1)

    }



  return (
    <div className='EditPage'>
        <button className='goBack' onClick={() => navigate(-1)}>
                <i className='fa-solid fa-arrow-left'></i>
                Go back
            </button>

            <h2>Edit user</h2>

            <form onSubmit={submitHandler}>
                <div className='inputBox'>
                    <label htmlFor='Name'>Name:</label>
                    <input required id='Name' type='text' value={user.Name} name='Name' onChange={onChangeInput} />
                </div>

                <div className='inputBox'>
                    <label htmlFor='Email'>Email:</label>
                    <input required id='Email' type='email' value={user.Email} name='Email' onChange={onChangeInput} />
                </div>

                <div className='inputBox'>
                    <label htmlFor='Role'>Role:</label>
                    <input required id='Role' type='text' value={user.Role} name='Role' onChange={onChangeInput} />
                </div>

                <div className='inputBox'>
                    <label htmlFor='Status'>Status:</label>
                    <input required id='Status' type='text' value={user.Status} name='Status' onChange={onChangeInput} />
                </div>
                
                <input type='submit' value='Update' />
            </form>
    </div>
  )
}
