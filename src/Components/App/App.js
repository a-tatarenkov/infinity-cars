import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lazy, Suspense } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ScrollToTop from "../MainPage/ScrollToTop/ScrollToTop";
import ActiveArrowUp from "../MainPage/ActiveArrowUp/ActiveArrowUp";
import "./App.scss";
import Spinner from "../MainPage/Spinner/Spinner";
import { setLogged, currentUserLogged,fetchUsers } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
const ErrorPage = lazy(() => import("../Pages/ErrorPage"));
const CommentAboutUs = lazy(() => import("../Pages/CommentAboutUs"));
const OurReviewsPage = lazy(() => import("../Pages/OurReviewsPage"));
const NewsDetails = lazy(() => import("../Pages/NewsDetails"));
const News = lazy(() => import("../Pages/News"));
const CarReviewDetails = lazy(() => import("../Pages/CarReviewDetails"));
const CarReviewPage = lazy(() => import("../Pages/CarReviewPage"));
const FAQPage = lazy(() => import("../Pages/FAQPage"));
const SellPage = lazy(() => import("../Pages/SellPage"));
const AdminPage = lazy(() => import("../Pages/AdminPage"));
const LoginPage = lazy(() => import("../Pages/LoginPage"));
const ContactsPage = lazy(() => import("../Pages/ContactPage"));
const AboutUsPage = lazy(() => import("../Pages/AboutUsPage"));
const ProductDetailsPage = lazy(() => import("../Pages/ProductDetailsPage"));
const ComparePage = lazy(() => import("../Pages/ComparePage"));
const CarPage = lazy(() => import("../Pages/CarsPage"));
const MainPage = lazy(() => import("../Pages/MainPage"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  if (localStorage.getItem("user")) {
    const user = localStorage.getItem("user");
    dispatch(currentUserLogged(user[0]));
    dispatch(setLogged(true));
    dispatch(fetchUsers(request))
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Spinner />}>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/car_search_results" element={<CarPage />} />
            <Route
              path="/productdetail/:carId"
              element={<ProductDetailsPage />}
            />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/about_us" element={<AboutUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/car_review" element={<CarReviewPage />} />
            <Route
              path="/car_review_details/:carID"
              element={<CarReviewDetails />}
            />
            <Route path="/news" element={<News />} />
            <Route path="/news/:newsId" element={<NewsDetails />} />
            <Route
              path="/our_review_details/:carId"
              element={<OurReviewsPage />}
            />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/comment_about_us" element={<CommentAboutUs />} />
          </Routes>
          <Footer />
          <ActiveArrowUp />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
