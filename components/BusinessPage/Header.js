import styled from "styled-components";
import { dark, jaBlue, lightBorder } from "../../constants/colors";

const TopBar = styled.div`
  height: 22px;
  background-color: ${dark};
  border-bottom: 4px solid ${jaBlue};
`;

const BusinessDetails = styled.div`
  padding: 30px;
  border-bottom: 6px solid ${dark};
  display: flex;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  width: 83px;
  min-width: 83px;
  height: 83px;
  border: 1px solid ${lightBorder};
  border-radius: 50%;
  background-image: ${props => `url(${props.image})`};
  background-size: contain;
`;

const DetailsContainer = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BusinessName = styled.h1`
  font-size: 2.1rem;
  text-transform: uppercase;
`;

const Divider = styled.div`
  width: 50%;
  height: 4px;
  background-color: ${jaBlue};
  margin: 10px 0;
`;

const BusinessContact = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.8rem;
`;

const BusinessDescription = styled.p`
  margin-top: 10px;
  font-size: 1.2rem;
  line-height: 1.6rem;
`;

const Header = props => (
  <div>
    <TopBar />
    <BusinessDetails>
      <LogoContainer image={props.business.image_url} />
      {/* <img src={props.business.image_url} /> */}
      <DetailsContainer>
        <BusinessName>{props.business.name}</BusinessName>
        <Divider />
        {props.business.phone && (
          <BusinessContact>{props.business.phone}</BusinessContact>
        )}
        {props.business.address && (
          <BusinessContact>{props.business.address}</BusinessContact>
        )}
        {props.business.website && (
          <BusinessContact>
            <a href={`${props.business.website}`} target="_blank">
              {props.business.website}
            </a>
          </BusinessContact>
        )}
        {props.business.email && (
          <BusinessContact>{props.business.email}</BusinessContact>
        )}
        {props.business.description && (
          <BusinessDescription>
            {props.business.description}
          </BusinessDescription>
        )}
      </DetailsContainer>
    </BusinessDetails>
  </div>
);

export default Header;
