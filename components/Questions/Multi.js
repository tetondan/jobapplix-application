import { useState } from "react";
import styled, { css } from "styled-components";

import { dark, white, jaBlue } from "../../constants/colors";
import position from "../../pages/position";

const MultiContainer = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

const QuestionText = styled.p`
  font-size: 1.3rem;
  margin-bottom: 15px;
`;

const MultiSelector = styled.div`
  height: 33px;
  overflow: ${props => (props.open ? "visible" : "hidden")};
  border: ${props => (props.open ? "none" : `1px solid ${dark}`)};
  border-radius: 5px;
  position: relative;
  display: inline-flex;
  flex-wrap: wrap;
`;

const MultiWindow = styled.div`
  padding-right: 10px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  visibility: ${props => (props.open ? "hidden" : "visible")};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MultiList = styled.div`
  position: relative;
  border: ${props => (props.open ? `1px solid ${dark}` : "none")};
  border-radius: 5px;
  background-color: ${white};
  top: ${props =>
    css`
      ${props.valueIndex * -33}px
    `};
  left: -1px;
  z-index: ${props => (props.open ? 100 : -1)};
  display: inline-flex;
  flex-direction: column;
`;

const MultiOption = styled.div`
  height: 33px;
  padding-left: 8px;
  padding-right: 55px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  &:hover {
    background-color: ${jaBlue};
    color: ${white};
  }
  cursor: pointer;
`;

const MultiQuestion = props => {
  const [open, setOpen] = useState(false);
  const valueIndex = props.options.findIndex(item => item === props.value);
  return (
    <MultiContainer>
      <QuestionText>{props.question}</QuestionText>
      <MultiSelector open={open}>
        <MultiWindow open={open} onClick={e => setOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17.314"
            height="10.071"
            viewBox="0 0 17.314 10.071"
          >
            <path
              id="Path_76"
              data-name="Path 76"
              d="M630.786,5883.881l7.95,7.95,7.95-7.95"
              transform="translate(-630.079 -5883.174)"
              fill="none"
              stroke="#2b2d2d"
              strokeWidth="2"
            />
          </svg>
        </MultiWindow>
        <MultiList
          open={open}
          valueIndex={valueIndex}
          onClick={e => setOpen(false)}
        >
          {props.options.map(option => {
            return (
              <MultiOption
                key={option + Math.random()}
                onClick={props.changeHandler(props.id, option, props.sub)}
              >
                {option}
              </MultiOption>
            );
          })}
        </MultiList>
      </MultiSelector>
    </MultiContainer>
  );
};

export default MultiQuestion;
