import * as React from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import HeroSection from "../components/Home/HeroSection";
import ServiceSection from "../components/Home/ServiceSection";
import WhyUsSection from "../components/Home/WhyUsSection";
import TestimonialSection from "../components/Home/TestimonialSection";
import CtaSection from "../components/Home/ctaSection";
import FaqSection from "../components/Home/faqSection";
import FooterSection from "../components/ui/Footer";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <HeroSection asChild />
      <ServiceSection asChild />
      <WhyUsSection asChild />
      <TestimonialSection asChild />
      <CtaSection asChild />
      <FaqSection asChild />
      <FooterSection asChild />
    </div>
  );
}
