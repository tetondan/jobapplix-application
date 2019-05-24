import styled from "styled-components";

import { dark, jaBlue } from "../../constants/colors";

const BarContainer = styled.div`
  padding: 15px 30px;
  display: flex;
  align-items: center;
`;

const Bar = styled.div`
  flex-grow: 1;
  border: 1px solid ${dark};
  border-radius: 8px;
  height: 16px;
  overflow: hidden;
`;

const InnerBar = styled.div`
  width: ${props => props.width};
  height: 100%;
  border-radius: 8px;
  background-color: ${jaBlue};
`;

const Step = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 7px;
`;

const ProgressBar = props => {
  return (
    <BarContainer>
      <Bar>
        <InnerBar width={props.width} />
      </Bar>
      <Step>{props.step}</Step>
    </BarContainer>
  );
};

export default ProgressBar;
