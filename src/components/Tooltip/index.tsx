import { MutableRefObject, useEffect, useRef } from "react";
import {
  TooltipActionTypes,
  useTooltipContext,
} from "../../context/useTooltipContext";
import cn from "classnames";
import styles from "./tooltip.module.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Tooltip = () => {
  const {
    state: {
      tooltip: { location, text },
    },
    dispatch,
  } = useTooltipContext();

  useEffect(() => {
    if (text) {
      tooltipRef.current.style.top = `${location.bottom}px`;
      tooltipRef.current.style.left = `${location.center}px`;
    }
  }, [location, text]);

  const { isMobileView } = useWindowDimensions();

  // In mobile view, delete the tooltip on scroll from icon
  // TO-DO: Find a better approach to resolve this issue
  useEffect(() => {
    const deleteTooltipOnScroll = () => {
      dispatch({
        type: TooltipActionTypes.DELETE_TOOLTIP,
      });
    };

    if (isMobileView) {
      window.addEventListener("scroll", deleteTooltipOnScroll);
    }

    return () => {
      if (isMobileView) {
        window.removeEventListener("scroll", deleteTooltipOnScroll);
      }
    };
  }, [isMobileView, dispatch]);

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
