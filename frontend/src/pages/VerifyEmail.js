import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import { baseUrl } from "../utils/service";
import { AuthContext } from "../contexts/AuthContexts";

const VerifyEmail = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get("emailToken");
  console.log(user);
  console.log("Email Token", emailToken);

  useEffect(() => {
    const verifyEmail = async () => {
      if (user?.isVerified) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (emailToken) {
        setIsLoading(true);
        try {
          const response = await axios.post(
            `${baseUrl}/users/verify-email`,
            JSON.stringify({ emailToken }),
            { headers: { "Content-Type": "application/json" } }
          );
          setIsLoading(false);
          if (response.data.error) {
            setError(response.data);
          } else {
            updateUser({ ...user, isVerified: true });
          }
        } catch (error) {
          setIsLoading(false);
          console.error("Error verifying email:", error);
          setError(error.response ? error.response.data : error.message);
        }
      }
    };

    verifyEmail();
  }, [emailToken, user, navigate, updateUser]);

  return (
    <div>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div>
          {user?.isVerified ? (
            <div>
              <Alert severity="success">
                Email Successfully verified, redirecting...
              </Alert>
            </div>
          ) : (
            <div>
              {error ? <Alert severity="error">{error.message}</Alert> : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;

// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Import axios
// import { useLocation } from "react-router-dom"; // Import useLocation

// function VerifyEmail() {
//   const location = useLocation();
//   const [isVerified, setIsVerified] = useState(false);

//   useEffect(() => {
//     const handle = async () => {
//       try {
//         const params = new URLSearchParams(location.search);
//         const emailToken = params.get("emailToken");
//         const response = await axios.patch(
//           "http://localhost:3000/api/users/verify-email",
//           {
//             emailToken: emailToken,
//           }
//         );

//         if (response.data.status === "Success") {
//           setIsVerified(true);
//         }

//         console.log(response);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     handle();
//   }, [location.search]);

//   return (
//     <div>
//       {isVerified ? (
//         <h1>Your email has been verified</h1>
//       ) : (
//         <h1>Verifying your email...</h1>
//       )}
//     </div>
//   );
// }

// export default VerifyEmail;
