import React from "react";

export const BusinessContext = React.createContext(null);

const BusinessContextComponent = props => {
  return (
    <BusinessContext.Provider value={{ name: "Dan" }}>
      {props.children}
    </BusinessContext.Provider>
  );
};

export default BusinessContextComponent;
