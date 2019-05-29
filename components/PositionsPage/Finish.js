import { useContext } from "react";
import { withRouter } from "next/router";

import ProgressBar from "./ProgressBar";
import styled from "styled-components";
import { PositionContext } from "../../context/PositionContext";

import { dark, jaBlue, white } from "../../constants/colors";

import {
  GroupContainer,
  QuestionsContainer,
  ButtonsGroup,
  Buttons
} from "./QuestionsGroup";

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const Instructions = styled.p`
  font-size: 1.4rem;
  line-height: 2.5rem;
  text-align: center;
`;

const Finish = props => {
  const positionContext = useContext(PositionContext);
  return (
    <GroupContainer>
      <ProgressBar
        width={`${props.percentage}%`}
        step={`${1 + Number(props.router.query.pageId)}/${props.total}`}
      />
      <QuestionsContainer>
        <Title>FINISH</Title>
        <Instructions>
          Almost there! Please take a momment to look back through your
          application and change anything that doesn't look right. When you are
          ready, hit the submit button below to finish up.
        </Instructions>
      </QuestionsContainer>
      <ButtonsGroup>
        <Buttons
          color={dark}
          bgColor={white}
          onClick={e => props.router.back()}
        >
          PREVIOUS
        </Buttons>
        <Buttons
          color={white}
          bgColor={jaBlue}
          onClick={positionContext.submitApplication}
        >
          SUBMIT
        </Buttons>
      </ButtonsGroup>
    </GroupContainer>
  );
};

export default withRouter(Finish);
