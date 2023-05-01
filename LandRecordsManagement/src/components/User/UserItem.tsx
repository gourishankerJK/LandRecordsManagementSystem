import React from "react";

interface UserItemProps {
  label?: string;
  value: string | React.ReactNode;
  OuterBoxClass? : string;
  [key: string]: any; // To accept any other additional props
}

const UserItem: React.FC<UserItemProps> = ({ label = "", value,OuterBoxClass="" ,...res }) => {
  return (
    <div className={`${OuterBoxClass} ele`}>
      <span className="label">{label}</span>
      <span className="value" {...res}>{value}</span>
    </div>
  );
};

export default UserItem;
