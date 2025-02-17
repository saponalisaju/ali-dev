export const getUserManagementData = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

// Setting data in local storage
const handleSetData = () => {
  const user = { id: 1, name: "John Doe" };
  localStorage.setItem("user", JSON.stringify(user));
  console.log("User data set in local storage");
};

// Getting data from local storage
const handleGetData = () => {
  const data = localStorage.getItem("user");
  if (data) {
    const parsedUser = JSON.parse(data);
    console.log("Retrieved user:", parsedUser);
  } else {
    console.log("No user data found in local storage");
  }
};

// Example usage
handleSetData();
handleGetData();
