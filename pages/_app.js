import React from "react";
import App, { Container } from "next/app";

import GlobalStyles from "../components/GlobalStyles";

import BusinessContextProvider from "../context/BusinessContext";
import PositionContextProvider from "../context/PositionContext";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <BusinessContextProvider>
          <PositionContextProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </PositionContextProvider>
        </BusinessContextProvider>
      </Container>
    );
  }
}

export default MyApp;
