import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function HomePage() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState('');
  const [display, setDisplay] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);


  const navigate = useNavigate();

  useEffect(() => {
    loadingData();
  }, []);

  const loadingData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const update = (Name) => {
    const value = `${Name.slice(0, 15)}...`;
    setValue(value);
    setDisplay(false);
  };

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const recordsPerPage = 5;
  const filteredUsers = users.filter(item => item.Name.toLowerCase().includes(value.toLowerCase()));
  const npage = Math.ceil(filteredUsers.length / recordsPerPage);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredUsers.slice(firstIndex, lastIndex);
  const numbers = [...Array(npage).keys()].map(n => n + 1);

  return (
    <div className='HomePage'>
      <div className="btn">
        <button className="btn add" onClick={() => navigate('/user/add')}>+ Add User</button>
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            placeholder="search"
            className="btn search"
            value={value}
            onChange={event => {
              setValue(event.target.value);
              setCurrentPage(1);
            }}
            onClick={() => setDisplay(true)}
          />
        </span>
      </div>

      <div className='container'>
        {display && filteredUsers.map(item => (
          <div className='item' key={item.id} onClick={() => update(item.Name)}>
            <span onClick={() => navigate(`/user/about/${item.id}`)}>{item.Name}</span>
          </div>
        ))}
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(user => (
              <tr key={user.id}>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Role}</td>
                <td>{user.Status}</td>
                <td>
                  <div className="btn">
                    <button className="btn edit" onClick={() => navigate(`/user/edit/${user.id}`)}>Edit</button>
                    <button className="btn delete" onClick={() => deleteUser(user.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>Prev</a>
            </li>
            {numbers.map(n => (
              <li className={`page-item ${currentPage === n ? 'active' : ""}`} key={n}>
                <a href="#" className="page-link" onClick={() => changeCPage(n)}>{n}</a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
