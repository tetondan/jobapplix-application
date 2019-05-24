import { withRouter } from "next/router";
import Link from "next/Link";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";

import Question from "./Question";

import { dark, jaBlue, white } from "../../constants/colors";

export const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  padding: 0 30px;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
`;

export const Notice = styled.p`
  margin: 5px 0;
  font-size: 1.2rem;
  line-height: 1.7rem;
  margin-bottom: 20px;
  text-align: center;
`;

// Three types of questions text, boolean, multi

export const ButtonsGroup = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: space-between;
`;

export const Buttons = styled.button`
  color: ${props => props.color && props.color};
  background-color: ${props => props.bgColor && props.bgColor};
  font-size: 1.3rem;
  padding: 15px 32px;
  border: 2px solid ${dark};
  border-radius: 24px;
  outline: none;
`;

const QuestionsGroup = props => {
  return (
    <>
      <ProgressBar
        width={`${props.percentage}%`}
        step={`${1 + Number(props.router.query.pageId)}/${props.total}`}
      />
      <Container>
        <Title>{props.title}</Title>
        <Notice>* indicates required field</Notice>
        {props.questions.map(question => {
          return (
            <Question
              key={question.id}
              question={question}
              value={props.answersGroup.group[question.id]}
              changeHandler={props.answersGroup.changeHandler}
              showLabel={!(props.group === "basic")}
            />
          );
        })}
      </Container>
      <ButtonsGroup>
        <Buttons
          color={dark}
          bgColor={white}
          onClick={e => props.router.back()}
        >
          PREVIOUS
        </Buttons>
        <Link as={props.nextAs} href={props.nextPage}>
          <Buttons color={white} bgColor={jaBlue}>
            SAVE & NEXT
          </Buttons>
        </Link>
      </ButtonsGroup>
    </>
  );
};

export default withRouter(QuestionsGroup);
