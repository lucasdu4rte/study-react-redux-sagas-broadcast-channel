import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./pages/Home";
import "./styles/global.scss";
import "./styles/reset.scss";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
