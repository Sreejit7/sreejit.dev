import { useCallback } from "react";
import { MutableRefObject, useEffect, useState } from "react";
import {
  GlobalContextActionsTypes,
  useGlobalContext,
} from "../context/useGlobalContext";
import { sections } from "../data/sections";

type scrollProps = {
  refs: {
    section: string;
    ref: MutableRefObject<HTMLElement>;
  }[];
  headerHeight: number;
};
const useScroll = ({ refs, headerHeight }: scrollProps) => {
  const {
    state: { visibleSection },
    dispatch,
  } = useGlobalContext();

  const [transparentNavbar, setTransparentNavbar] = useState(true);

  const handleVisibleSection = useCallback((section: string) => {
    dispatch({
      type: GlobalContextActionsTypes.SET_VISIBLE_SECTION,
      section,
    });
  },[dispatch]);

  useEffect(() => {
    const setNavbarTransparency = () => {
      const scrollPosition = window.scrollY + headerHeight;
      const introHeadingTop = refs.find(
        ({ section, ref }) => section === sections.IntroHeading
      )?.ref.current.offsetTop;
      if (introHeadingTop && scrollPosition >= introHeadingTop) {
        setTransparentNavbar(false);
      } else {
        setTransparentNavbar(true);
      }
    };

    const getVisibleSection = () => {
      const scrollPosition = window.scrollY + headerHeight;
      const selectedSection = refs.find(({ ref }) => {
        if (ref && ref.current) {
          const { offsetTop } = ref.current;
          const { height } = ref.current.getBoundingClientRect();
          return (
            scrollPosition >= offsetTop && scrollPosition <= offsetTop + height
          );
        }
      });

      if (selectedSection?.section !== visibleSection) {
        handleVisibleSection(selectedSection?.section as string);
      } else if (!selectedSection && visibleSection) {
        handleVisibleSection("");
      }
    };

    window.addEventListener("scroll", getVisibleSection);
    window.addEventListener("scroll", setNavbarTransparency);

    return () => {
      window.removeEventListener("scroll", getVisibleSection);
      window.removeEventListener("scroll", setNavbarTransparency);
    };
  }, [headerHeight, visibleSection, refs, handleVisibleSection]);

  return {
    transparentNavbar,
  };
};

export default useScroll;
