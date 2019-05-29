import Head from "next/head";
import ErrorPage from "next/error";
import { withRouter } from "next/router";
import { useContext, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

import App from "../components/App";
import Menu from "../components/SidebarMenu/Menu";
import Footer from "../components/Footer";
import Header from "../components/PositionsPage/Header";
import Description from "../components/PositionsPage/Description";
import QuestionsGroup from "../components/PositionsPage/QuestionsGroup";
import Questions from "../components/PositionsPage/Questions";
import WorkHistoryGroup from "../components/PositionsPage/WorkHistoryGroup";
import EduHistoryGroup from "../components/PositionsPage/EduHistoryGroup";
import PersonalRefsGroup from "../components/PositionsPage/PersonalRefsGroup";
import ShiftTimes from "../components/PositionsPage/Availability/ShiftTimes";
import Finish from "../components/PositionsPage/Finish";
import Complete from "../components/PositionsPage/Complete";

import { API_URL } from "../constants/urls";
import { checkStatus } from "../helpers";
import { PositionContext } from "../context/PositionContext";

const ApplicationContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
`;

const PositionPage = props => {
  const { router, position, business, error } = props;
  if (error) {
    console.log(error);
    return <ErrorPage statusCode={error} />;
  }

  const positionContext = useContext(PositionContext);

  const isQuestionsGroup = currentGroup => {
    return (
      currentGroup !== "workHistory" &&
      currentGroup !== "personalRefs" &&
      currentGroup !== "eduHistory" &&
      currentGroup !== "availability" &&
      currentGroup !== "finish" &&
      currentGroup !== "complete"
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
    eduHistory: "EDUCATIONAL HISTORY",
    availability: "AVAILABILITY"
  };

  const menuVisible = () => {
    return props.router.query.pageId !== undefined && group !== "complete";
  };

  return (
    <App>
      <Head>
        <title>{business.name}</title>
      </Head>
      <Header business={business} positionName={position.name} />
      <ApplicationContainer>
        <Menu visible={menuVisible()} />
        {pageId !== undefined && isQuestionsGroup(group) && (
          <QuestionsGroup
            title={titles[group]}
            percentage={percentageComplete}
            total={positionContext.availableGroups.length}
            nextPage={nextPage}
            nextAs={nextAs}
            notice="* indicates required field"
          >
            <Questions
              group={group}
              questions={questions.questions}
              answersGroup={positionContext[group]}
            />
          </QuestionsGroup>
        )}
        {group === "workHistory" && (
          <QuestionsGroup
            title={titles[group]}
            percentage={percentageComplete}
            total={positionContext.availableGroups.length}
            nextPage={nextPage}
            nextAs={nextAs}
            notice="Please provide information for the last two years of your employment"
          >
            <WorkHistoryGroup />
          </QuestionsGroup>
        )}
        {group === "personalRefs" && (
          <QuestionsGroup
            title={titles[group]}
            percentage={percentageComplete}
            total={positionContext.availableGroups.length}
            nextPage={nextPage}
            nextAs={nextAs}
            notice="Please provide three personal references"
          >
            <PersonalRefsGroup />
          </QuestionsGroup>
        )}
        {group === "eduHistory" && (
          <QuestionsGroup
            title={titles[group]}
            percentage={percentageComplete}
            total={positionContext.availableGroups.length}
            nextPage={nextPage}
            nextAs={nextAs}
            notice="Please provide your educational history, starting with high school"
          >
            <EduHistoryGroup />
          </QuestionsGroup>
        )}
        {group === "availability" && (
          <QuestionsGroup
            title={titles[group]}
            percentage={percentageComplete}
            total={positionContext.availableGroups.length}
            nextPage={nextPage}
            nextAs={nextAs}
            notice="What days and times are you available? Please select all that apply:"
          >
            <ShiftTimes />
          </QuestionsGroup>
        )}
        {group === "finish" && (
          <Finish
            percentage={percentageComplete}
            total={positionContext.availableGroups.length}
          />
        )}
        {group === "complete" && <Complete />}
        {pageId === undefined && (
          <Description
            description={position.description}
            nextPage={nextPage}
            nextAs={nextAs}
          />
        )}
      </ApplicationContainer>
      <Footer />
    </App>
  );
};

PositionPage.getInitialProps = async context => {
  try {
    console.log(context.business);
    console.log(context.position);
    const businessRes = await fetch(
      `${API_URL}/businesses?url=${context.query.business}`
    );
    await checkStatus(businessRes);
    const businessData = await businessRes.json();

    const positionRes = await fetch(
      `${API_URL}/businesses/position?id=${
        context.query.position
      }&businessUrl=${context.query.business}`
    );

    await checkStatus(positionRes);
    const positionData = await positionRes.json();

    return {
      business: businessData.business,
      position: positionData
    };
  } catch (err) {
    return {
      error: err.response.status
    };
  }
};
export default withRouter(PositionPage);
