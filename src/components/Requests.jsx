import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    fetchRequests();
  }, []);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(">>>err", err.message);
    }
  };

  const reviewRequests = async (requestId, status) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        null,
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(requestId));
    } catch (err) {
      console.log(">>>>>err", err.message);
    }
  };
  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className=" flex  justify-center text-2xl font-bold my-2">
        No request found !!!
      </h1>
    );
  return (
    <div className=" my-10">
      <ul className="list bg-base-300 rounded-box shadow-md w-1/2 mx-auto">
        <li className="p-4 pb-2 text-3xl font-bold opacity-60 tracking-wide">
          Requests
        </li>{" "}
        {requests.map((value) => {
          const {
            _id,
            fromUserId: { firstName, lastName, about, age, gender, photoUrl },
          } = value;
          return (
            <li className="list-row" key={_id}>
              <div>
                <img className="size-10 rounded-box" src={photoUrl} />
              </div>
              <div>
                <div>
                  {firstName} {lastName}
                </div>

                {
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {age}, {gender}
                  </div>
                }
              </div>
              <p className="list-col-wrap text-xs">{about}</p>
              <div className="flex gap-2">
                <button
                  className="btn  btn-primary"
                  onClick={() => reviewRequests(_id, "rejected")}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequests(_id, "accepted")}
                >
                  Accept
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Request;
