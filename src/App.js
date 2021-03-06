import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockedProvider } from "./utils/contexts/MockedContext";
import UserPage from "./page/UserPage";
import Home from "./page/Home";
import Error from "./page/ErrorPage";
import GlobalStyle from "./utils/style/GlobalStyle";

export default function App() {
  return (
    <BrowserRouter>
      <MockedProvider>
        <div className="App">
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </MockedProvider>
    </BrowserRouter>
  );
}
