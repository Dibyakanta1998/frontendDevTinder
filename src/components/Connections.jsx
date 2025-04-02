import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  useEffect(() => {
    fetchConnections();
  }, []);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(">>>err", err.message);
    }
  };

  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="flex justify-center text-2xl font-bold">
        No connections found !!!
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold">Connections</h1>
      {connections.map((value) => {
        const { _id, firstName, lastName, about, age, gender, photoUrl } =
          value;
        return (
          <div
            key={_id}
            className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
