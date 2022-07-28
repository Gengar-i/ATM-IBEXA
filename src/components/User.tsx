import React from "react";

interface UserProps {
  name: string;
  card: string;
};

const User: React.FC<UserProps> = ({ name, card }) => (
  <>
    <div className="user__name">
      <span className="user__name--text">{name}</span>
      <span className="user__name--label">Card holder</span>
    </div>
    <div className="user__card">
      <span className="user__card--text">{card}</span>
      <span className="user__card--label">Card number</span>
    </div>
  </>
);

export default User;