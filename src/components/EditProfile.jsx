import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = () => {
  const user = useSelector((store) => store.user);

  const [showToast, setShowToast] = useState(false);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);

  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          photoUrl,
          gender,
        },
        {
          withCredentials: true,
        }
      );
      setShowToast(true);

      dispatch(addUser(res?.data?.data));

      setTimeout(() => {
        setShowToast(false);
      }, 500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {user && (
        <div className="flex justify-center my-5">
          <div className="flex justify-center mx-10 ">
            <div className="card bg-base-300 w-96 shadow-sm">
              <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
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
                    <legend className="fieldset-legend ">Age</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Type here"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend ">Photo Url</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Type here"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </fieldset>

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Gender</legend>
                    <select
                      defaultValue="Pick a browser"
                      className="select"
                      onClick={(event) => {
                        setGender(event.target.value);
                      }}
                    >
                      <option disabled={true}>Pick a gender</option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                      <option value={"others"}>Others</option>
                    </select>
                  </fieldset>

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend ">About</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Type here"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </fieldset>
                  {error && <p className="text-red-500">Error: {error}</p>}
                </div>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary" onClick={saveProfile}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <UserCard
            user={{ firstName, lastName, photoUrl, gender, about, age }}
            isHideBottom
          />
        </div>
      )}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
