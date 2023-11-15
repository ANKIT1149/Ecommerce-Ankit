import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Cart, DashBoard, Home, NoPage, Order } from "./pages"
// import Profile from "./pages/admin/Profile/Profile"
function App() {
  return (
    <>
   <Router>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/*" element={<NoPage />} />
     </Routes>
   </Router>
    </>
  )
}

export default App
