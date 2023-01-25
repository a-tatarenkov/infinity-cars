import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "../Header/Header";
import {
  MainPage,
  CarPage,
  ComparePage,
  ProductDetailsPage,
  AboutUsPage,
  ContactsPage,
  LoginPage,
  AdminPage,
  SellPage
} from "../Pages";
import Footer from "../Footer/Footer";
import ScrollToTop from "../MainPage/ScrollToTop/ScrollToTop";
import ActiveArrowUp from "../MainPage/ActiveArrowUp/ActiveArrowUp";
import "./App.scss";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <ScrollToTop />
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
        </Routes>
        <Footer />
        <ActiveArrowUp />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
