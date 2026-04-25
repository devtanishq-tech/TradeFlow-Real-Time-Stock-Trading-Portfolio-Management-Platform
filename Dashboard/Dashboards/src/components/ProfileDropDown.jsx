import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  LayoutDashboard,
  Coins,
  HeadphonesIcon,
  UserPlus,
  Compass,
  Keyboard,
  HelpCircle,
  LogOut,
} from "lucide-react";
import "./DropDown.css";

const ProfileDropDown = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      navigate("/login", {
        state: { message: "Successfully logged out" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dropdown">
      {/* User Info Header */}
      <div className="dropdown-header">
        <div className="dropdown-avatar">ZU</div>
        <div className="dropdown-user-info">
          <span className="dropdown-username">USERID</span>
          <span className="dropdown-email">user@example.com</span>
        </div>
      </div>

      <div className="dropdown-divider" />

      {/* Section 1: Profile-related */}
      <div className="dropdown-section">
        <div className="dropdown-item">
          <User size={15} className="dropdown-icon" />
          <span>My Profile</span>
        </div>
        <div className="dropdown-item">
          <LayoutDashboard size={15} className="dropdown-icon" />
          <span>Console</span>
        </div>
        <div className="dropdown-item">
          <Coins size={15} className="dropdown-icon" />
          <span>Coin</span>
        </div>
        <div className="dropdown-item">
          <HeadphonesIcon size={15} className="dropdown-icon" />
          <span>Support</span>
        </div>
        <div className="dropdown-item">
          <UserPlus size={15} className="dropdown-icon" />
          <span>Invite Friends</span>
        </div>
      </div>

      <div className="dropdown-divider" />

      {/* Section 2: Platform features / Help */}
      <div className="dropdown-section">
        <div className="dropdown-item">
          <Compass size={15} className="dropdown-icon" />
          <span>Tour Kite</span>
        </div>
        <div className="dropdown-item">
          <Keyboard size={15} className="dropdown-icon" />
          <span>Keyboard Shortcuts</span>
        </div>
        <div className="dropdown-item">
          <HelpCircle size={15} className="dropdown-icon" />
          <span>Help</span>
        </div>
      </div>

      <div className="dropdown-divider" />

      {/* Section 3: Logout */}
      <div className="dropdown-section">
        <div
          className="dropdown-item dropdown-item--logout"
          onClick={handleLogout}
        >
          <LogOut size={15} className="dropdown-icon" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
