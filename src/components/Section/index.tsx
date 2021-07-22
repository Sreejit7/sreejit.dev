import styles from './section.module.scss';

type SectionProps = {
  title: string;
};
const Section = ({ title }: SectionProps) => {
  return (
    <section className={styles.section}>
      <h2>This is {title} section </h2>
    </section>
  );
};

export default Section;
