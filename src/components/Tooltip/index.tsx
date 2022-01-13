import { MutableRefObject, useEffect, useRef } from "react";
import { useTooltipContext } from "../../context/useTooltipContext";
import cn from "classnames";
import styles from "./tooltip.module.scss";

const Tooltip = () => {
  const {
    state: {
      tooltip: { location, text },
    },
  } = useTooltipContext();

  useEffect(() => {
    if (text) {
      tooltipRef.current.style.top = `${location.bottom}px`;
      tooltipRef.current.style.left = `${location.center}px`;
    }
  }, [location, text]);

  const tooltipRef = useRef() as MutableRefObject<HTMLElement>;

  return (
    <span
      ref={tooltipRef}
      className={
        text ? cn(styles["tooltip"], styles["tooltip-show"]) : styles["tooltip"]
      }
    >
      {text}
    </span>
  );
};

export default Tooltip;
