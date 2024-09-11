import React from "react";
import "../css/myAccount.css"; // Import CSS for styling

const AccountPage = () => {
  // Mock user data
  const user = {
    avatar: "https://via.placeholder.com/150", // Placeholder avatar
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className="account-page-fullscreen">
      <header className="account-header">
        <img src={user.avatar} alt="User Avatar" className="avatar" />
        <div className="user-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </header>

      <nav className="account-navbar">
        <ul>
          <li>
            <a href="/myposts">My Posts</a>
          </li>
          <li>
            <a href="/history">Read History</a>
          </li>
          <li>
            <a href="/my-followed-users">My Followed Users</a>
          </li>
          <li>
            <a href="/account-settings">Account Settings</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </nav>

      <div className="content-placeholder">
        {/* You can add content below, such as recent activity, posts, etc. */}
        <p>Welcome to your account dashboard, {user.name}!</p>
      </div>
    </div>
  );
};

export default AccountPage;
