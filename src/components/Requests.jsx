import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";

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
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold">Request</h1>
      {requests.map((value) => {
        const {
          _id,
          fromUserId: { firstName, lastName, about, age, gender, photoUrl },
        } = value;
        return (
          <div
            key={_id}
            className=" flex m-4 p-4 justify-between items-center rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p>
                  {age} , {gender}
                </p>
              )}

              <p>{about}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
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
          </div>
        );
      })}
    </div>
  );
};

export default Request;
