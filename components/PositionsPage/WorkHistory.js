import { withRouter } from "next/router";
import Link from "next/Link";
import ProgressBar from "./ProgressBar";

// import Text from "../Questions/Text";

import { dark, jaBlue, white } from "../../constants/colors";

import {
  Container,
  Title,
  Notice,
  ButtonsGroup,
  Buttons
} from "./QuestionsGroup";

const WorkHistory = props => {
  console.log(props);
  return (
    <>
      <ProgressBar
        width={`${props.percentage}%`}
        step={`${1 + Number(props.router.query.pageId)}/${props.total}`}
      />
      <Container>
        <Title>{props.title}</Title>
        <Notice>
          Please Provide Information for Your Last Two Years of Employment
        </Notice>
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

export default withRouter(WorkHistory);
