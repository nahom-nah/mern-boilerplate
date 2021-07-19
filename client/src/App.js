import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { AuthContextProvider } from "./context/authContext";
function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
