import { Routes, Route } from "react-router-dom";
import { Header } from "./component/Header";
import { HomePage } from "./page/HomePage";
import { NotFoundPage } from "./page/NotFoundPage";
import { NavigationPage } from "./page/NavigationPage";
import { AddPage } from "./page/AddPage";
import { EditPage } from "./page/EditPage";
import { AboutPage } from "./page/AboutPage"
import { ReportPage } from "./page/ReportPage";
import { SettingsPage } from "./page/SettingsPage";

export  function App() {
  return (
    <div className="App">
      <Header/>
      <div className="item">
        <NavigationPage/>
        
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/user/add" element={<AddPage/>}/>
          <Route path="/user/edit/:id" element={<EditPage/>}/>
          <Route path="/user/about/:id" element={<AboutPage/>}/>
          <Route path="/user/report" element={<ReportPage/>}/>
          <Route path="/user/settings" element={<SettingsPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </div>
  )
}
