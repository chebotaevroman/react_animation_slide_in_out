import React, { useState, useRef, useEffect, TransitionEvent } from "react";

import "./Collapse.css";

interface ICollapseProps {
  children: React.ReactNode;
}

const Collapse = ({ children }: ICollapseProps) => {
  const childrenDivRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [transitionInProcess, setTransitionInProcess] = useState(false);

  const startHide = (el: HTMLDivElement) => {
    el.classList.add("motionCollapse");

    el.style.height = `${el.scrollHeight}px`;
    setTimeout(() => {
      if (el) {
        el.style.height = "0";
        el.style.opacity = "0";
      }
    }, 0);
  };

  const endHide = (el: HTMLDivElement) => {
    el.style.height = "0";
    el.style.opacity = "0";
  };

  const startShow = (el: HTMLDivElement) => {
    el.classList.add("motionCollapse");

    el.style.height = `${el.scrollHeight}px`;
    el.style.opacity = "1";
  };

  const endShow = (el: HTMLDivElement) => {
    el.style.height = "auto";
    el.style.opacity = "1";
  };

  useEffect(() => {
    if (!childrenDivRef.current) {
      return;
    }

    const el = childrenDivRef.current;

    if (transitionInProcess) {
      isVisible ? startHide(el) : startShow(el);
    } else {
      isVisible ? endShow(el) : endHide(el);
    }
  }, [isVisible, transitionInProcess]);

  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === "height") {
      setTransitionInProcess(false);
      setIsVisible((prev) => !prev);

      childrenDivRef.current?.classList.remove("motionCollapse");
    }
  };

  const handleButtonClick = () => {
    setTransitionInProcess(true);
  };

  return (
    <div>
      <button className="showButton" onClick={handleButtonClick}>
        {isVisible ? "hide" : "show"}
      </button>
      <div ref={childrenDivRef} onTransitionEnd={onTransitionEnd}>
        {children}
      </div>
    </div>
  );
};

export default Collapse;
