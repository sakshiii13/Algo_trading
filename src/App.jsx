import React, { useEffect } from "react";
import "./App.css";
import RouterPage from "./components/RouterPage";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,      
      once: true,          
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <RouterPage />
    </>
  );
}

export default App;