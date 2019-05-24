import Head from "next/head";
import { withRouter } from "next/router";
import { useContext, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import App from "../../components/App";
import Footer from "../../components/Footer";
import Header from "../../components/PositionsPage/Header";
import Description from "../../components/PositionsPage/Description";
// import Basics from "../../components/PositionsPage/Basics";
import QuestionsGroup from "../../components/PositionsPage/QuestionsGroup";
import WorkHistory from "../../components/PositionsPage/WorkHistory";

import { API_URL } from "../../constants/urls";

import { BusinessContext } from "../../context/BusinessContext";
import { PositionContext } from "../../context/PositionContext";

const PositionPage = props => {
  const { router, position, business } = props;

  const positionContext = useContext(PositionContext);

  const isQuestionsGroup = currentGroup => {
    return (
      currentGroup !== "workHistory" &&
      currentGroup !== "personalRefs" &&
      currentGroup !== "eduHistory" &&
      currentGroup !== "shiftTimes"
    );
  };

  useEffect(() => {
    positionContext.loadPosition(position);
  }, []);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, [props.router.query.pageId]);

  // Get the ID of the page if there is one.
  const pageId = router.query.pageId && Number(router.query.pageId);

  // Using the pageId, find the percentage of the application completed
  const percentageComplete =
    ((pageId + 1) / positionContext.availableGroups.length) * 100;

  // Once the questions have loaded, get the name of the question group using the pageId
  const group =
    pageId !== undefined && positionContext.availableGroups.length > 0
      ? positionContext.availableGroups[pageId]
      : "";

  // Once the questions have loaded, get the list of questions using the pageId and group name.
  const questions = (pageId !== undefined &&
    isQuestionsGroup(group) &&
    position.questions.find(obj => obj.groupName === group)) || {
    questions: []
  };

  const nextPage = `/position?business=${router.query.business}&position=${
    router.query.position
  }&pageId=${pageId === undefined ? 0 : pageId + 1}`;

  const nextAs = `/${router.query.business}/${router.query.position}/${
    pageId === undefined ? 0 : pageId + 1
  }`;
  const titles = {
    basic: "BASIC INFORMATION",
    position: "POSITION & AVAILABILITY",
    history: "EMPLOYMENT HISTORY",
    general: "GENERAL INFORMATION",
    skills: "RELEVANT SKILLS",
    other: "OTHER INFORMATION",
    workHistory: "WORK HISTORY",
    personalRefs: "PERSONAL REFERENCES",
    eduHistory: "EDUCATIONAL HISTORY"
  };

  return (
    <App>
      <Head>
        <title>{business.name}</title>
      </Head>
      <Header business={business} positionName={position.name} />
      {/* If there is no page id, load the description screen. If the Id is 0 load the basics screen. Otherwise, load the questions screen*/}
      {pageId !== undefined && isQuestionsGroup(group) && (
        <QuestionsGroup
          title={titles[group]}
          group={group}
          questions={questions.questions}
          answersGroup={positionContext[group]}
          percentage={percentageComplete}
          total={positionContext.availableGroups.length}
          nextPage={nextPage}
          nextAs={nextAs}
        />
      )}
      {group === "workHistory" && (
        <WorkHistory
          title={titles[group]}
          group={group}
          percentage={percentageComplete}
          total={positionContext.availableGroups.length}
          nextPage={nextPage}
          nextAs={nextAs}
        />
      )}
      {group === "personalRefs" && <div>PERSONAL REFS</div>}
      {group === "eduHistory" && <div>EDUCATIONAL HISTORY</div>}
      {pageId === undefined && (
        <Description
          description={position.description}
          nextPage={nextPage}
          nextAs={nextAs}
        />
      )}
      <Footer />
    </App>
  );
};

PositionPage.getInitialProps = async context => {
  const businessRes = await fetch(
    `${API_URL}/businesses?url=${context.query.business}`
  );
  const businessData = await businessRes.json();

  const positionRes = await fetch(
    `${API_URL}/businesses/position/${context.query.position}`
  );
  const positionData = await positionRes.json();

  return {
    business: businessData.business,
    position: positionData
  };
};
export default withRouter(PositionPage);
