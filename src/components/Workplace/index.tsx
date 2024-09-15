import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import cn from "classnames";

import { WorkplaceType } from "./types";
import styles from "./workplace.module.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";

interface WorkplacePropsType {
  name: string;
  info: WorkplaceType;
  highlighted: boolean;
  index: number;
  handleHighlight: (index: number) => void;
}
const Workplace = ({
  name,
  info: { logo, timeline },
  highlighted,
  index,
  handleHighlight,
}: WorkplacePropsType) => {
  const [hovered, setHovered] = useState(false);
  const { isMobileView } = useWindowDimensions();

  const onHighlight = (index: number) => {
    setHovered((prevHovered) => !prevHovered);
    // If any item is not hovered, highlight the current workplace
    handleHighlight(!hovered ? index : 0);
  };

  return (
    <motion.article
      className={styles.workplace}
      onHoverStart={() => onHighlight(index)}
      onHoverEnd={() => onHighlight(index)}
    >
      <Image
        className={styles.logo}
        src={logo}
        height={isMobileView ? 20 : 50}
        width={isMobileView ? 78 : 180}
        layout="intrinsic"
        alt={name}
      />

      {/* This is a small motion component */}

      <motion.small
        className={cn(
          styles.timeline,
          highlighted && styles["timeline-highlighted"],
        )}
      >
        {timeline}
      </motion.small>
    </motion.article>
  );
};

export default Workplace;
