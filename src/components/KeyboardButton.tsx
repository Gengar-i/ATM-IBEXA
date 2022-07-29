import React from "react";

interface KeyboardButtonProps {
  id: number;
  name: string;
  onClick: () =>  void;
};

const KeyboardButton: React.FC<KeyboardButtonProps> = ({ id, name, onClick }) => (
  <div
    data-testid={`atm-button-${name.toLowerCase()}`}
    className={`atm__button button-${id}`}
    onClick={onClick}
    role="button"
  >
    <span className="atm__text">{name}</span>
  </div>
);

export default KeyboardButton;