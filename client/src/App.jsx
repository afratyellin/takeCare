import React from "react";
import { useLanguage } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

function App() {
  const { language } = useLanguage();

  return (
    <div dir={language === "he" ? "rtl" : "ltr"}>
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
