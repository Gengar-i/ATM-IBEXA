import React, { useCallback, useState } from "react";
import { BUTTONS as BUTTON_HELPERS } from "./helpers";
import User from "../components/User";
import ActionButton from "../components/ActionButton";
import KeyboardButton from "../components/KeyboardButton";
import AccountLabel from "../components/AccountLabel";
import "../styles/main.scss";

interface Action {
  id: number;
  name: string;
};

interface Button {
  id: number;
  name: string;
  onClick: () => void;
};

interface Currency {
  id: number;
  name: string;
};

interface User_data {
  id: number;
  name: string;
  card: string;
  balance: number;
};

enum ATM_ACTIONS { Deposit = "Deposit", Withdraw = "Withdraw" };

enum CURRENCY_OPTIONS { Dolar = "$" };

const USER_DATA: User_data = {
  id: 0,
  name: "John Rambo",
  card: "2156 0000 0002 6987",
  balance: 2000
};

const CURRENCY: Currency[] = [{ id: 0, name: CURRENCY_OPTIONS.Dolar}];

const ACTIONS: Action[] = [
  {
    id: 0,
    name: ATM_ACTIONS.Deposit
  },
  {
    id: 1,
    name: ATM_ACTIONS.Withdraw,
  }
];

const BUTTONS: Button[] = BUTTON_HELPERS;

const Main: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<Action>({ id: 0, name: ATM_ACTIONS.Deposit });
  const [currency, setCurrency] = useState(CURRENCY[0]);
  const [isDeposit, setIsDeposit] = useState(true);
  const [balance, setBalance] = useState(USER_DATA.balance);
  const [showedValue, setShowedValue] = useState(null);
  const handleChangeActions = useCallback((id: number, name: string) => {
    setSelectedAction({ id, name });
    setIsDeposit(name === "Deposit");
  }, []);
  const handleBalanceChange = useCallback(() => {

  }, []);
  const handleValueChange = useCallback(() => {

  }, []);
  return (
    <main>
      <div className="left-side">
        <div className="user">
          <User name={USER_DATA.name} card={USER_DATA.card} />
        </div>
        <div className="actions">
          {ACTIONS.map(({id, name}: Action) => (
            <ActionButton
              id={id}
              name={name}
              selectedActionID={selectedAction.id}
              handler={handleChangeActions}
            />
          ))}
        </div>
      </div>
      <div className="right-side">
        <div className="account">
          <AccountLabel name="balance" value={balance} />
          <AccountLabel name="income" value={200} />
          <AccountLabel name="outcome" value={300} />
        </div>
        <div className="atm">
          <div className="atm__screen">
            <div className="atm__screen__content">
              <span>{currency.name}</span>
              <span className={isDeposit ? "green" : "red"}>{showedValue}</span>
            </div>
          </div>
          <div className="atm__wrapper">
            {BUTTONS.map(({ id, name, onClick }: Button) => (
              <KeyboardButton
                id={id}
                name={name}
                onClick={onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;