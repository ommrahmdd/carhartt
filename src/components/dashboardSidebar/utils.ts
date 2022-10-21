import gsap, { Power0 } from "gsap";

let openUtil = (
  el: Element,
  duration: number,
  display: string,
  opacity: number,
  width: string
) => {
  return {
    duration,
    display,
    opacity,
    width,
  };
};
// HANDLE: Open Sidebar
export let openSidebar = () => {
  let tl = new (gsap.timeline as any)();
  tl.to(document.querySelector(".dashboard__overlay"), {
    duration: 0.2,
    ease: Power0.easeInOut,
    display: "block",
    opacit: 2,
    width: "100%",
  })
    .to(document.querySelector(".dashboard__sidebar"), {
      duration: 0.3,
      ease: Power0.easeInOut,
      display: "flex",
      opacit: 2,
      width: "60%",
      stagger: 0.2,
    })
    .to(document.querySelectorAll(".sideElements__element"), {
      duration: 0.2,
      ease: Power0.easeInOut,
      opacity: 2,
      stagger: 0.2,
      y: 15,
    });
};

// HANDLE: Close Sidebar
export let closeSidebar = () => {
  let tl = new (gsap.timeline as any)();
  tl.to(document.querySelectorAll(".sideElements__element"), {
    duration: 0.2,
    ease: Power0.easeInOut,
    opacity: 0,
    stagger: 0.2,
    y: -15,
  })
    .to(document.querySelector(".dashboard__overlay"), {
      duration: 0.3,
      ease: Power0.easeInOut,
      display: "none",
      opacit: 0,
      width: 0,
    })
    .to(document.querySelector(".dashboard__sidebar"), {
      duration: 0.2,
      ease: Power0.easeInOut,
      display: "none",
      opacit: 0,
      width: "0",
    });
};
