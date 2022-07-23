import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Mentorlogin from "./component/mentorlogin";
import Signup from "./component/Signup";
import Mentorsignup from "./component/mentorSignup";
import Header from "./component/Header";
import Home from "./component/Home";
import Favourite from "./component/Favourite";
import Viewprofile from "./component/Viewprofile";
import Recommended from "./component/RecommendationList";
import Admindashboard from "./component/admindashboard";
import { CartProvider } from "react-use-cart";

function App() {
  return (
    <div>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="mentorlogin" element={<Mentorlogin />} />
          <Route path="mentorsignup" element={<Mentorsignup />} />
          <Route path="viewprofile" element={<Viewprofile />} />
          <Route path="signup" element={<Signup />} />
          <Route path="recommended" element={<Recommended />} />
          <Route path="favourite" element={<Favourite />} />
          <Route path="admin" element={<Admindashboard />} />
        </Routes>
        <div className="footer">
          <div
            className="text-center p-5"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          >
            © 2021 Copyright:
            <a
              className="text-reset fw-bold"
              href="https://www.cognizant.com/in/en/"
            >
              TutorCruise.com
            </a>
          </div>
        </div>
      </CartProvider>
    </div>
  );
}

export default App;
