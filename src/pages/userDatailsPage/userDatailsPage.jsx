import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./userDatailsPage.css";
import axios from "axios";

const UserDatailsPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const loginHanler = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (name === "") {
        return toast.warning("Please enter your name.");
      } else if (age === "") {
        return toast.warning("Please enter your age.");
      } else if (gender === "") {
        return toast.warning("Please choose gender.");
      } else if (dob === "") {
        return toast.warning("Please enter your DOB.");
      }
      axios
        .post("http://localhost:8000/users/userDetails", { name, age, gender, dob })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
          }
        })
        .catch((error) => {
          if (error.response && !error.response.data.success) {
            toast.error(error.response.data.message);
          } else {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-button" onClick={loginHanler}>
          Login
        </div>
        <div className="login-body">
          <div className="login-page-title">User details</div>
          <div className="title-note">Please enter your details.</div>
          <div className="label-input-div">
            <div className="input-label">Name</div>
            <input type="text" placeholder="Enter your name..." value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="dob">
            <label>Date of Birth:</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
          </div>
          <div className="gender-dob-row">
            <div className="age">
              <label>Age:</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min="1" required />
            </div>
            <div className="geders">
              <div className="each-gender">
                <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} /> Male
              </div>
              <div className="each-gender">
                <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} /> Female
              </div>
              <div className="each-gender">
                <input type="radio" name="gender" value="Other" onChange={(e) => setGender(e.target.value)} /> Other
              </div>
            </div>
          </div>
          <button className="sign-in-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="login-right">
        <div className="circle-container">
          <div className="circle"></div>
          <div className="circle-glass-morphism"></div>
        </div>
      </div>
    </div>
  );
};

export default UserDatailsPage;

// import React, { useState } from "react";
// import axios from "axios";
// import "./signupPage.css";

// const SignupPage = () => {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [dob, setDob] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // try {
//     //   const response = await axios.post("/userDetails", {
//     //     name,
//     //     age,
//     //     gender,
//     //     dob,
//     //   });
//     //   console.log(response.data); // Assuming the backend sends back a response
//     // } catch (error) {
//     //   console.error("Error submitting form:", error);
//     // }
//   };

//   return (
//     <div className="user-form">
//       <h2>User Details</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

//         <label>Age:</label>
//         <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />

//         <label>Gender:</label>
//         <label>
//           <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} />
//           Male
//         </label>
//         <label>
//           <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} />
//           Female
//         </label>

//         <label>Date of Birth:</label>
//         <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;
