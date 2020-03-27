import React from "react";
import Collapsible from "react-collapsible";
import { ChevronDown } from "react-feather";

import styles from "./LinkGroup.module.scss";

const LinkGroupTrigger = ({ icon, title, subtitle }) => {
  return (
    <div className={styles.header}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>
        <span className={styles.title}>{title}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>
      <div className={styles.arrow}>
        <ChevronDown />
      </div>
    </div>
  );
};

const LinkGroup = ({ icon, title, subtitle, children }) => {
  return (
    <div className={styles.outer}>
      <Collapsible
        easing="ease-in-out"
        trigger={
          <LinkGroupTrigger icon={icon} title={title} subtitle={subtitle} />
        }
        contentInnerClassName={styles.inner}
      >
        <div className={styles.content}>{children}</div>
      </Collapsible>
    </div>
  );
};

export default LinkGroup;
