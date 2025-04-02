import React from "react";

const UserCard = ({ user, isHideBottom }) => {
  const { photoUrl, firstName, lastName, age, gender, about } = user;
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
            <button className="btn btn-primary">Ignore</button>

            <button className="btn btn-secondary">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
