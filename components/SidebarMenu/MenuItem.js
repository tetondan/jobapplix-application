import { useContext } from "react";
import { withRouter } from "next/router";
import Link from "next/Link";
import styled, { css } from "styled-components";

import { positionsBorder, jaBlue, white } from "../../constants/colors";

const MenuItemContainer = styled.div`
  padding: 20px 30px 20px 20px;
  font-size: 1.2rem;
  width: 100%;
  position: relative;
  cursor: pointer;
  ${props =>
    props.selected &&
    css`
      background-color: ${jaBlue};
      color: ${white};
      box-shadow: 0 1px 3px ${positionsBorder};
    `}
`;

const Pointer = styled.div`
  position: absolute;
  top: 0;
  left: 206px;
  border-left: 26px solid ${jaBlue};
  border-top: 26px solid transparent;
  border-bottom: 26px solid transparent;
`;

const titles = {
  basic: "BASIC INFORMATION",
  position: "POSITION & AVAILABILITY",
  history: "EMPLOYMENT HISTORY",
  general: "GENERAL INFORMATION",
  skills: "RELEVANT SKILLS",
  other: "OTHER INFORMATION",
  workHistory: "WORK HISTORY",
  personalRefs: "PERSONAL REFERENCES",
  eduHistory: "EDUCATIONAL HISTORY",
  availability: "AVAILABILITY",
  finish: "SAVE & SUBMIT"
};

const MenuItem = props => {
  return (
    <Link
      as={`/${props.router.query.business}/${props.router.query.position}/${
        props.index
      }`}
      href={`/position?business=${props.router.query.business}&position=${
        props.router.query.position
      }&pageId=${props.index}`}
    >
      <MenuItemContainer selected={props.selected}>
        {titles[props.group]}
        {props.selected && <Pointer />}
      </MenuItemContainer>
    </Link>
  );
};

export default withRouter(MenuItem);
