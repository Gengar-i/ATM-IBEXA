import React, { useCallback, useState } from "react";
import { BUTTONS as BUTTON_HELPERS } from "./helpers";
import User from "../components/User";
import ActionButton from "../components/ActionButton";
import KeyboardButton from "../components/KeyboardButton";
import AccountLabel from "../components/AccountLabel";
import MuiSnackBar from "../components/MuiSnackBar";
import "../styles/main.scss";

interface Action {
  id: number;
  name: string;
};

interface Button {
  id: number;
  name: string;
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
  const [isDeposit, setIsDeposit] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(USER_DATA.balance);
  const [deposited, setDeposited] = useState<number>(0);
  const [withdrawed, setWithdrawed] = useState<number>(0);
  const [showedValue, setShowedValue] = useState<number>(0);
  const [alertLabel, setAlertLabel] = useState<string>("");

  const depositValue = useCallback((amount: number) => {
    if (balance + amount > 1000000) {
      setAlertLabel("Account cannot hold that amount of money! Consider subscribing premium!");
    } else {
      setBalance(balance + amount);
      setDeposited(deposited + amount);
    }
  }, [balance, deposited]);

  const withdrawValue = useCallback((amount: number) => {
    if (amount > balance) {
      setAlertLabel("Not enough money in balance!");
    } else {
      setBalance(balance - amount);
      setWithdrawed(withdrawed + amount);
    }
  }, [balance, withdrawed]);

  const clear = useCallback(() => {
    setShowedValue(0);
  }, []);

  const onAccept = useCallback((amount: number) => {
    if (isDeposit) depositValue(amount);
    else withdrawValue(amount);
    clear();
  }, [isDeposit, depositValue, withdrawValue, clear]);

  const handleChangeActions = useCallback((id: number, name: string) => {
    setSelectedAction({ id, name });
    setIsDeposit(name === "Deposit");
  }, []);

  const handleValueChange = useCallback((number: number) => {
    const newNumber = Number(String(showedValue) + String(number));
    if (newNumber > 100000) setAlertLabel("You can only deposit or withdraw at once 100 000");
    else setShowedValue(newNumber);
  }, [showedValue]);

  const handleKeyboardChange = useCallback((name: string) => {
    const number = Number(name);
    if (number || name === "0") {
      handleValueChange(number);
    } else {
      if (name.toLowerCase() === "accept") onAccept(showedValue);
      else if (name.toLowerCase() === "clear") clear();
    }
  }, [handleValueChange, onAccept, clear, showedValue]);

  return (
    <main>
      <div className="left-side">
        <div className="user">
          <User name={USER_DATA.name} card={USER_DATA.card} />
        </div>
        <div className="actions">
          {ACTIONS.map(({id, name}: Action) => (
            <ActionButton
              key={`action-${id}`}
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
          <AccountLabel name="income" value={deposited} />
          <AccountLabel name="outcome" value={withdrawed} />
        </div>
        <div className="atm">
          <div className="atm__screen">
            <div className="atm__screen__content">
              <span>{currency.name}</span>
              <span data-testid="atm-screen" className={isDeposit ? "green" : "red"}>
                {showedValue}
              </span>
            </div>
          </div>
          <div className="atm__wrapper">
            {BUTTONS.map(({ id, name }: Button) => (
              <KeyboardButton
                key={`atm-button-${id}`}
                id={id}
                name={name}
                onClick={() => handleKeyboardChange(name)}
              />
            ))}
          </div>
        </div>
      </div>
      {alertLabel && (
        <MuiSnackBar
          open={Boolean(alertLabel)}
          autoHideDuration={4000}
          onClose={() => setAlertLabel("")} 
          label={alertLabel}
        />
      )}
    </main>
  );
};

export default Main;