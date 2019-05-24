import styled from "styled-components";
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App = props => <AppContainer>{props.children}</AppContainer>;

export default App;
