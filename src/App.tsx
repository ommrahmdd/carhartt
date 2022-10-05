import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Nav from "./components/nav/Nav";
const Home = lazy(() => import("./pages/home/Home"));
const About = lazy(() => import("./pages/about/About"));
const Men = lazy(() => import("./pages/men/Men"));
const Women = lazy(() => import("./pages/women/Women"));
const HomeUI = lazy(() => import("./pages/HomeUI/HomeUI"));
const SingleCategory = lazy(
  () => import("./pages/SingleCategory/SingleCategory")
);
const Category = lazy(() => import("./pages/category/Category"));
const AddProduct = lazy(() => import("./pages/addProduct/AddProduct"));

// HINT:
// /home-ui for modify the home content like header and category
// /addProduct for add new product
// -------------------------------
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
          <Route path="/category/:catID" element={<SingleCategory />} />
          <Route path="/category" element={<Category />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="*" element={<div>Error</div>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
