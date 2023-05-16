import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupMembersState } from "../state/groupMembers";
import { expensesState } from "../state/expenses";

export default function AddExpenseForm() {
  const members = useRecoilValue(groupMembersState);

  const today = new Date();
  const [date, setDate] = useState(
    [
      today.getFullYear(),
      today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1,
      today.getDate() < 10 ? "0" + today.getDate() : today.getDate(),
    ].join("-")
  );
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState(null);
  const [validated, setValidated] = useState(false);

  const [isDescValid, setIsDescValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [isPayerValid, setIsPayerValid] = useState(false);

  const setExpense = useSetRecoilState(expensesState);

  const checkFormValidity = () => {
    const descValid = desc.length > 0;
    const payerValid = payer !== null;
    const amountValid = amount > 0;

    setIsDescValid(descValid);
    setIsAmountValid(amountValid);
    setIsPayerValid(payerValid);

    return descValid && payerValid && amountValid;
  };

  const hadleSubmit = (event) => {
    event.preventDefault();

    if (checkFormValidity()) {
      const newExpense = {
        date,
        desc,
        amount,
        payer,
      };
      setExpense((expense) => [...expense, newExpense]);
    }

    setValidated(true);
  };

  return (
    <Form noValidate onSubmit={hadleSubmit}>
      <h3>1. 비용 추가하기</h3>
      <Form.Group>
        <Form.Control
          type="date"
          placeholder="결재한 날짜를선택해주세요"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          isValid={isPayerValid}
          isInvalid={!isPayerValid && validated}
          placeholder="비용에 대한 설명을 입력해 주세요"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Form.Control.Feedback type="invalid" data-valid={isDescValid}>
          비용 내용을 입력해 주셔야 합니다.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          isValid={isAmountValid}
          isInvalid={!isAmountValid && validated}
          placeholder="비용은 얼마였나요?"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Form.Control.Feedback type="invalid" data-valid={isAmountValid}>
          1원 이상의 금액을 입력해 주셔야 합니다.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Select
          defaultValue=""
          isValid={isPayerValid}
          isInvalid={!isPayerValid && validated}
          onChange={({ target }) => setPayer(target.value)}
        >
          <option disabled value="">
            누가 결제했나요?"
          </option>
          {members.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid" data-valid={isPayerValid}>
          결재자를 선택해 주셔야 합니다.
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">추가하기</Button>
    </Form>
  );
}
