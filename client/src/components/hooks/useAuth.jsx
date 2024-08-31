import { useState } from "react";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    fetch("http://localhost:5001/api/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (user) => user.username === email && user.password === password
        );
        if (user) {
          setCurrentUser(user);
        } else {
          alert("Invalid credentials");
        }
      });
  };

  const logout = () => {
    console.log("Logging out");
    
    setCurrentUser(null);
  };

  return {
    currentUser,
    login,
    logout,
  };
};
