import React from "react";

interface AccountLabelProps {
  name: string;
  value: number | null;
};

const AccountLabel: React.FC<AccountLabelProps> = ({ name, value }) => (
  <div className={`account__${name} status`}>
    <span className={`account__${name}--amount`}>{value}$</span>
    <span className={`account__${name}--label`}>{name.toUpperCase()}</span>
  </div>
);

export default AccountLabel;