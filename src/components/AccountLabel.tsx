import React from "react";

interface AccountLabelProps {
  name: string;
  value: number | null;
};

const AccountLabel: React.FC<AccountLabelProps> = ({ name, value }) => {
  const convertedValue: string = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (
    <div className={`account__${name.toLowerCase()} status`}>
      <span
        data-testid={`account-label-${name.toLowerCase()}`}
        className={`account__${name}--amount`}
      >
        {convertedValue}$
      </span>
      <span className={`account__${name}--label`}>{name.toUpperCase()}</span>
    </div>
  );
};

export default AccountLabel;