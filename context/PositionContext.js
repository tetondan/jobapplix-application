import React, { useState } from "react";
import unfetch from "isomorphic-unfetch";

export const PositionContext = React.createContext({
  details: {},
  loadPosition: () => {},
  basicGroup: {},
  positionGroup: {},
  historyGroup: {},
  generalGroup: {},
  skillsGroup: {},
  otherGroup: {},
  customGroup: {},
  availableGroups: []
});

const PositionContextComponent = props => {
  const [details, setDetails] = useState({
    id: "",
    name: "",
    description: "",
    availability: false,
    shiftTimes: {},
    workHistory: false,
    eduHistory: false,
    personalRefs: false
  });

  const [basicGroup, setBasicGroup] = useState({});
  const [positionGroup, setPositionGroup] = useState({});
  const [historyGroup, setHistoryGroup] = useState({});
  const [generalGroup, setGeneralGroup] = useState({});
  const [skillsGroup, setSkillsGroup] = useState({});
  const [otherGroup, setOtherGroup] = useState({});
  const [customGroup, setCustomGroup] = useState({});

  const [availableGroups, setAvailableGroups] = useState([]);

  const changeHandler = (group, setGroup) => (id, value, sub) => e => {
    let updatedQuestion = group[id];
    if (sub) {
      updatedQuestion = { ...updatedQuestion, subValue: value };
    } else {
      updatedQuestion = { ...updatedQuestion, value };
    }
    setGroup({ ...group, [id]: updatedQuestion });
  };

  const loadPosition = position => {
    setDetails({
      id: position.id,
      name: position.name,
      description: position.description,
      availability: position.availability,
      shiftTimes: position.shift_times,
      workHistory: position.work_history,
      eduHistory: position.educational_history,
      personalRefs: position.personal_references
    });
    let groupsWithQuestions = [];
    position.questions.forEach(async questionsGroup => {
      if (questionsGroup.questions.length > 0) {
        groupsWithQuestions.push(questionsGroup.groupName);
        let group, setGroup;
        if (questionsGroup.groupName === "basic") {
          group = basicGroup;
          setGroup = setBasicGroup;
        } else if (questionsGroup.groupName === "position") {
          group = positionGroup;
          setGroup = setPositionGroup;
        } else if (questionsGroup.groupName === "history") {
          group = historyGroup;
          setGroup = setHistoryGroup;
        } else if (questionsGroup.groupName === "general") {
          group = generalGroup;
          setGroup = setGeneralGroup;
        } else if (questionsGroup.groupName === "skills") {
          group = skillsGroup;
          setGroup = setSkillsGroup;
        } else if (questionsGroup.groupName === "other") {
          group = otherGroup;
          setGroup = setOtherGroup;
        } else if (questionsGroup.groupName === "custom") {
          group = customGroup;
          setGroup = setCustomGroup;
        }

        let newQuestions = questionsGroup.questions.reduce((obj, question) => {
          let defaultValue =
            question.type === "multi"
              ? question.options && question.options[0]
              : question.type === "bool"
              ? false
              : "";
          let defaultSubValue = question.sub_type === "text" ? "" : false;
          return {
            ...obj,
            [question.id]: { value: defaultValue, subValue: defaultSubValue }
          };
        }, {});

        await setGroup(newQuestions);
      }
    });
    if (position.work_history) {
      groupsWithQuestions.push("workHistory");
    }

    if (position.personal_references) {
      groupsWithQuestions.push("personalRefs");
    }

    if (position.educational_history) {
      groupsWithQuestions.push("eduHistory");
    }

    setAvailableGroups(groupsWithQuestions);
  };

  return (
    <PositionContext.Provider
      value={{
        details,
        loadPosition,
        basic: {
          group: basicGroup,
          changeHandler: changeHandler(basicGroup, setBasicGroup)
        },
        position: {
          group: positionGroup,
          changeHandler: changeHandler(positionGroup, setPositionGroup)
        },
        history: {
          group: historyGroup,
          changeHandler: changeHandler(historyGroup, setHistoryGroup)
        },
        general: {
          group: generalGroup,
          changeHandler: changeHandler(generalGroup, setGeneralGroup)
        },
        skills: {
          group: skillsGroup,
          changeHandler: changeHandler(skillsGroup, setSkillsGroup)
        },
        other: {
          group: otherGroup,
          changeHandler: changeHandler(otherGroup, setOtherGroup)
        },
        custom: {
          group: customGroup,
          changeHandler: changeHandler(customGroup, setCustomGroup)
        },
        availableGroups
      }}
    >
      {props.children}
    </PositionContext.Provider>
  );
};

export default PositionContextComponent;
