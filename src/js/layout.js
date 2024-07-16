import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/AppContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Contact from "./views/Contact";
import AddContact from "./views/AddContact";
import NotFoundPage from "./views/NotFoundPage";

//create your first component
const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Contact />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<AddContact />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
