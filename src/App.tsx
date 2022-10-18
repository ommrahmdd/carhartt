import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Nav from "./components/nav/Nav";
import Loading from "./components/loading/Loading";
const Home = lazy(() => import("./pages/home/Home"));
const About = lazy(() => import("./pages/about/About"));
const HomeUI = lazy(() => import("./pages/HomeUI/HomeUI"));
const SingleCategory = lazy(
  () => import("./pages/SingleCategory/SingleCategory")
);
const Category = lazy(() => import("./pages/category/Category"));
const AddProduct = lazy(() => import("./pages/addProduct/AddProduct"));
const SingleProduct = lazy(() => import("./pages/SingleProduct/SingleProduct"));
const Lookbook = lazy(() => import("./pages/lookbook/Lookbook"));

// HINT:
// /home-ui for modify the home content like header and category
// /addProduct for add new product
// -------------------------------

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/home-ui" element={<HomeUI />} />
          <Route path="/category">
            <Route index element={<Category />} />
            <Route path=":catID" element={<SingleCategory />} />
            <Route path="product/:prodID" element={<SingleProduct />} />
          </Route>
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="*" element={<div>Error</div>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
