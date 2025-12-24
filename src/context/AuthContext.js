// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     // Check if user is logged in from localStorage
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setCurrentUser(user);
//       setIsAdmin(user.role === 'admin');
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData) => {
//     // In a real app, you would make an API call to authenticate
//     // For demo purposes, we'll just store the user in localStorage
//     const user = {
//       id: 'user123',
//       firstName: 'John',
//       lastName: 'Doe',
//       email: userData.email,
//       phone: '+1 (555) 123-4567',
//       address: '123 Main St',
//       city: 'New York',
//       country: 'USA',
//       role: userData.email === 'admin@example.com' ? 'admin' : 'user'
//     };
    
//     localStorage.setItem('user', JSON.stringify(user));
//     setCurrentUser(user);
//     setIsAdmin(user.role === 'admin');
//     return user;
//   };

//   const register = (userData) => {
//     // In a real app, you would make an API call to register
//     // For demo purposes, we'll just store the user in localStorage
//     const user = {
//       id: 'user' + Math.floor(Math.random() * 1000),
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email,
//       phone: userData.phone || '',
//       address: '',
//       city: '',
//       country: '',
//       role: 'user'
//     };
    
//     localStorage.setItem('user', JSON.stringify(user));
//     setCurrentUser(user);
//     setIsAdmin(false);
//     return user;
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setCurrentUser(null);
//     setIsAdmin(false);
//   };

//   const updateUserProfile = (userData) => {
//     // Update user data
//     const updatedUser = {
//       ...currentUser,
//       ...userData
//     };
    
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//     setCurrentUser(updatedUser);
//   };

//   const value = {
//     currentUser,
//     loading,
//     isAdmin,
//     login,
//     register,
//     logout,
//     updateUserProfile
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
