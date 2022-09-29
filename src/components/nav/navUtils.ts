import gsap, { Power0 } from "gsap";

export let handleOpenMenu = (el: Element | null) => {
  gsap.to(el, {
    duration: 0.5,
    top: 0,
    ease: Power0.easeInOut,
    display: "flex",
  });
};
export let handleCloseMenu = (el: Element | null) => {
  gsap.to(el, {
    duration: 0.5,
    top: "-1005",
    ease: Power0.easeInOut,
    display: "none",
  });
};
