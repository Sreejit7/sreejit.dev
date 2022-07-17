export const scrollToSection = (sectionTop?: number, headerHeight?: number) => {
  if (sectionTop && headerHeight) {
    window.scrollTo({
      top: sectionTop - headerHeight,
      behavior: "smooth",
    });
  }
};
