import { useContext } from "react";
import Link from "next/Link";
import { withRouter } from "next/router";
import styled from "styled-components";

import { jaBlue, dark, white } from "../../constants/colors";

import { PositionContext } from "../../context/PositionContext";

const DescriptionContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  h1 {
    font-size: 1.6rem;
  }

  p {
    margin: 30px 0;
    font-size: 1.2rem;
    line-height: 1.7rem;
    flex-grow: 1;
  }
`;

const GetStartedButton = styled.button`
  background-color: ${jaBlue};
  border: 2px solid ${dark};
  color: ${white};
  margin-bottom: 20px;
  height: 50px;
  width: 187px;
  border-radius: 25px;
  font-size: 1.3rem;
  outline: none;
`;

const Description = props => {
  const { details } = useContext(PositionContext);
  return (
    <DescriptionContainer>
      <h1>DESCRIPTION</h1>
      <p>{details.description}</p>
      <Link as={`${props.router.asPath}/0`} href={props.nextPage}>
        <GetStartedButton>GET STARTED</GetStartedButton>
      </Link>
    </DescriptionContainer>
  );
};

export default withRouter(Description);
