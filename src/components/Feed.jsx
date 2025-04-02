import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  useEffect(() => {
    getFeed();
  }, []);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(">>>>errr", err.message);
    }
  };
  console.log("🚀 ~ getFeed ~ res:", feed);

  if (!feed) return;
  if (feed.length === 0)
    return (
      <h1 className="flex justify-center text-2xl font-bold">
        No new users found !!!
      </h1>
    );

  return (
    feed &&
    feed.length !== 0 && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
