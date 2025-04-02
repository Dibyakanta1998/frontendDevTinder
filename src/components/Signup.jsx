import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("abhishek9937@gmail.com");
  const [password, setPassword] = useState("Abc@1234");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));

      return navigate("/profile");
    } catch (error) {
      setError(error.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Signup</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend ">First Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend ">Last Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend ">Email Id</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend ">Password</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          {error && <p className="text-red-500">Error: {error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Signup
            </button>
          </div>
          <p className="m-auto cursor-pointer ">
            Existing user?
            <Link className="underline" to="/login">
              Login here!!!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
