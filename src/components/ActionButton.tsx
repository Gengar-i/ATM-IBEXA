import React from "react";

interface ActionButtonProps {
  id: number;
  name: string;
  selectedActionID: number;
  handler: (id: number, name: string) => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ id, selectedActionID, name, handler }) => (
  <div className="actions__button">
    <div
      className={`${(selectedActionID === id) ? "active" : ""} ${name.toLowerCase()}`}
      onClick={() => handler(id, name)}
      role="button"
    >
      {name}
    </div>
  </div>
);

export default ActionButton;