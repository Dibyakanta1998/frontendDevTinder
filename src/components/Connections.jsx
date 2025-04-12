import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MessageCircleIcon } from "lucide-react";

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
    <div className=" my-10">
      <ul className="list bg-base-300 rounded-box shadow-md w-1/2 mx-auto">
        <li className="p-4 pb-2 text-3xl font-bold opacity-60 tracking-wide">
          Connections
        </li>
        {connections.map((value) => {
          const { _id, firstName, lastName, about, age, gender, photoUrl } =
            value;
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

              <Link to={"/chat/" + _id}>
                <button className="btn btn-square btn-ghost">
                  <MessageCircleIcon />
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
