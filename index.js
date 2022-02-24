import { Nav, Main, Footer } from "./components";
import * as state from "./store";

import Navigo from "navigo";
import { capitalize } from "lodash";

import dotenv from "dotenv";
dotenv.config();

const router = new Navigo(window.location.origin);

function render(st) {
  document.getElementById("root").innerHTML = `
      ${Nav(state.Links)}
      ${Main(st)}
      ${Footer()}
    `;
  router.updatePageLinks();
  addEventListener(st);
}

function addEventListener(st) {
  //select the hamburger class on the DOM
  const hamburger = document.querySelector(".hamburger");
  //Select the navMenu on the DOM(page)
  const navMenu = document.querySelector(".nav-menu");
  //Listen for a click on the hamburger icon and execute the function
  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
  window.addEventListener("scroll", function() {
    var navbar = document.querySelector("navbar");
    navbar.classList.toggle("sticky", this.window.scrollY > 0);
  });
}

router
  .on({
    "/": () => render(state.Home),
    ":view": params => render(state[capitalize(params.view)])
  })
  .resolve();
