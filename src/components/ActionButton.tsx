import React from "react";

interface ActionButtonProps {
  id: number;
  name: string;
  selectedActionID: number;
  handler: (id: number, name: string) => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ id, selectedActionID, name, handler }) => (
  <div key={`action-${id}`} className="actions__button">
    <span
      className={`${(selectedActionID === id) ? "active" : ""} ${name.toLowerCase()}`}
      onClick={() => handler(id, name)}
      role="button"
    >
      {name}
    </span>
  </div>
);

export default ActionButton;