import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ExpenseMain from "./ExpenseMain";
import userEvent from "@testing-library/user-event";
import { groupMembersState } from "../state/groupMembers";

const renderComponent = () => {
  render(
    <RecoilRoot
      initializeState={(snap) => {
        snap.set(groupMembersState, ["영수", "영희"]);
      }}
    >
      <ExpenseMain />
    </RecoilRoot>
  );

  const dateInput = screen.getByPlaceholderText(/결제한 날짜/i);
  const descInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
  const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
  const payerInput = screen.getByDisplayValue(/누가 결재/i);
  const addButton = screen.getByText("추가하기");

  return {
    dateInput,
    descInput,
    amountInput,
    payerInput,
    addButton,
  };
};

describe("비용 정산 메인 페이지", () => {
  describe("비용 추가 컴포넌트", () => {
    test("비용 투가 컴포넌트 렌더링", () => {
      const { dateInput, descInput, amountInput, payerInput, addButton } =
        renderComponent();

      expect(dateInput).toBeInTheDocument();
      expect(descInput).toBeInTheDocument();
      expect(amountInput).toBeInTheDocument();
      expect(payerInput).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });

    test('비용 추가에필수적인 값을 입력하지 않고 "추가" 버튼 클릭시, 에러메시지를 노출한다', async () => {
      const { addButton } = renderComponent();

      expect(addButton).toBeInTheDocument();
      await userEvent.click(addButton);

      const descErrorMessage = screen.getByText(
        "비용 내용을 입력해 주셔야 합니다."
      );
      expect(descErrorMessage).toBeInTheDocument();

      const payerErrorMessage =
        screen.getByText("결재자를 선택해 주셔야 합니다.");
      expect(payerErrorMessage).toBeInTheDocument();

      const amountErrorMessage =
        screen.getByText("금액을 입력해 주셔야 합니다.");
      expect(amountErrorMessage).toBeInTheDocument();
    });

    test('비용 추가에필수적인 값을 입력한 후 "추가" 버튼 클릭시, 저장에 성공', async () => {
      const { descInput, amountInput, payerInput, addButton } =
        renderComponent();

      await userEvent.type(descInput, "장보기");
      await userEvent.type(amountInput, "30000");
      await userEvent.selectOptions(payerInput, "영수"); //테스트 돌리기 전에 paterList를 셋팅해야함
      await userEvent.click(addButton);

      const descErrorMessage = screen.queryByText(
        "비용 내용을 입력해 주셔야 합니다."
      );
      expect(descErrorMessage).not.toBeInTheDocument();
      const payerErrorMessage =
        screen.queryByText("결재자를 선택해 주셔야 합니다.");
      expect(payerErrorMessage).not.toBeInTheDocument();
      const amountErrorMessage =
        screen.queryByText("금액을 입력해 주셔야 합니다.");
      expect(amountErrorMessage).not.toBeInTheDocument();
    });
  });
});
