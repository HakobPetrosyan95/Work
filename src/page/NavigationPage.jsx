import { useNavigate } from "react-router-dom"

export  function NavigationPage() {
  const navigate = useNavigate()

  return (
    <div className="NavigationPage">
        <div className="sidebar">
         <button onClick={()=>navigate('/')}><i className="fa-solid fa-user"></i>Users</button>
         <button onClick={()=>navigate("user/report")}><i className="fa-solid fa-file-invoice"></i>Reporting</button>
         <button onClick={()=>navigate("user/settings")}><i className="fa-solid fa-gear"></i>Settings</button>
      </div>
    </div>
  )
}
