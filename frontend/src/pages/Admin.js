// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const getUserRole = () => {
//   // For demonstration, let's assume we're getting the user role from local storage
//   const user = JSON.parse(localStorage.getItem('user'));
//   return user && user.role === 'admin';
// };

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const isAdmin = getUserRole();

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAdmin ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };
