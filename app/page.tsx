import Admin from "@/components/landingPage/admin";
import ContactUs from "@/components/landingPage/contact";
import Footer from "@/components/landingPage/footer";
import HeroSection from "@/components/landingPage/intro";
import Navbar from "@/components/landingPage/navabar";
import Services from "@/components/landingPage/services";
import ViewTimetable from "@/components/landingPage/viewTimetable";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Admin />
      <ViewTimetable />
      <Services />
      <ContactUs />
      <Footer />
    </>
  );
};

export default LandingPage