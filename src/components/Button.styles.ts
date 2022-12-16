import styled, { css } from "styled-components";

interface IPROPS {
  variant: "primary" | "secondary" | "danger" | "success";
}

const buttonVariants = {
  primary: "purple",
  secondary: "orange",
  danger: "red",
  success: "green",
};
export const ButtonContainer = styled.button<IBUTTONTEST_ITEM>`
  width: 100px;
  height: 40px;

  ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
      color: ${props.theme["gray-100"]};
    `;
  }}
`;
