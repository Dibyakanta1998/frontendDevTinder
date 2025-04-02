import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { removeFeedByUser } from "../utils/feedSlice";

const UserCard = ({ user, isHideBottom }) => {
  const { photoUrl, firstName, lastName, age, gender, about, _id } = user;
  const dispatch = useDispatch();

  const handleSendRequests = async (toUserId, status) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserId,
        null,
        {
          withCredentials: true,
        }
      );
      dispatch(removeFeedByUser(toUserId));
    } catch (err) {
      console.log(">>>>>err", err.message);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm  ">
      <figure className="min-h-95 max-h-100">
        <img src={photoUrl} alt="User photo" className="object-contain" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + "," + gender}</p>}

        <p>{about}</p>
        {!isHideBottom && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequests(_id, "ignored")}
            >
              Ignore
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequests(_id, "interested")}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
