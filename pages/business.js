import Head from "next/head";
import ErrorPage from "next/error";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

import { API_URL } from "../constants/urls";
import { checkStatus } from "../helpers";
// import Head from "../components/Head";
import App from "../components/App";
import Header from "../components/BusinessPage/Header";
import PositionsList from "../components/BusinessPage/PositionsList";
import Footer from "../components/Footer";

const BusinessPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BusinessPage = props => {
  if (props.error) {
    return <ErrorPage statusCode={props.error} />;
  } else {
    return (
      <App>
        {/* <BusinessPageContainer> */}
        <Head>
          <title>{props.business.name}</title>
        </Head>

        <Header business={props.business} />
        <PositionsList positions={props.positions} />
        <Footer />
        {/* </BusinessPageContainer> */}
      </App>
    );
  }
};

BusinessPage.getInitialProps = async context => {
  try {
    const res = await fetch(
      `${API_URL}/businesses?url=${context.query.business}`
    );
    await checkStatus(res);
    const data = await res.json();
    return {
      business: data.business,
      positions: data.positions
    };
  } catch (err) {
    return {
      error: err.response.status
    };
  }
};
export default BusinessPage;
