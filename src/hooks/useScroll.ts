import { MutableRefObject, useEffect } from "react";
import { useGlobalContext } from "../context/useGlobalContext";

type scrollProps = {
  refs: {
    section: string;
    ref: MutableRefObject<HTMLElement>
  }[],
  headerHeight: number
}
const useScroll = ({ refs, headerHeight }: scrollProps) => {
  const { visibleSection, setVisibleSection } = useGlobalContext();
  useEffect(() => {
    const getVisibleSection = () => {
      const scrollPosition = window.scrollY + headerHeight;
      const selectedSection = refs.find(({ section, ref }) => {
        if(ref && ref.current){
          const { offsetTop } = ref.current;
          const { height } = ref.current.getBoundingClientRect();
          return scrollPosition > offsetTop && scrollPosition < (offsetTop + height)
        }
      });

      if(selectedSection?.section !== visibleSection){
        setVisibleSection(selectedSection?.section as string);
      }else if(!selectedSection && visibleSection){
        setVisibleSection("");
      }
    }
    window.addEventListener("scroll", getVisibleSection);

    return() => window.removeEventListener("scroll", getVisibleSection);
  },[]);

  return{
    visibleSection
  }
}

export default useScroll