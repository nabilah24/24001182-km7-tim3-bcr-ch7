import * as React from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  if (!token) {
    navigate({ to: "/login" });
  }

  return (
    <nav className="navbar flex items-center p-4 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between">
        <a className="text-primary text-2xl font-bold" href="#">
          BINAR RENTAL
        </a>

        {/* Off-canvas toggle button for smaller screens */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="block md:hidden">
              <span className="navbar-toggler-icon">☰</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-3/4">
            <SheetHeader>
              <Button
                variant="ghost"
                className="ml-auto"
                aria-label="Close"
                onClick={() => {}}
              >
                ✖️
              </Button>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-4">
              <a href="#ourServices" className="text-black">
                Our Services
              </a>
              <a href="#whyUs" className="text-black">
                Why Us
              </a>
              <a href="#testimonial" className="text-black">
                Testimonial
              </a>
              <a href="#faq" className="text-black">
                FAQ
              </a>
              <Button variant="success" className="text-white">
                Register
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Normal navbar for larger screens */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <a href="#ourServices" className="text-black">
              Our Services
            </a>
          </li>
          <li>
            <a href="#whyUs" className="text-black">
              Why Us
            </a>
          </li>
          <li>
            <a href="#testimonial" className="text-black">
              Testimonial
            </a>
          </li>
          <li>
            <a href="#faq" className="text-black">
              FAQ
            </a>
          </li>
          <li>
            <Button variant="success" className="text-white">
              Register
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
