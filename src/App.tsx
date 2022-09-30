import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Nav from "./components/nav/Nav";
const Home = lazy(() => import("./pages/home/Home"));
const About = lazy(() => import("./pages/about/About"));
const Men = lazy(() => import("./pages/men/Men"));
const Women = lazy(() => import("./pages/women/Women"));
const HomeUI = lazy(() => import("./pages/HomeUI/HomeUI"));
function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/home-ui" element={<HomeUI />} />
          <Route path="*" element={<div>Error</div>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
