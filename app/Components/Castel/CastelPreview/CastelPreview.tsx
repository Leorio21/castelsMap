import React from "react";
import type { Castel } from "@/app/Type/Castel";
import Image from "next/image";
import styles from "./CastelPreview.module.css";
import classNames from "classnames";

interface CastelPreviewProps {
  castel: Castel;
  onclick: (castelSelected: Castel) => void;
}

function CastelPreview({
  castel,
  onclick,
}: CastelPreviewProps): React.JSX.Element {
  return (
    <article
      className={classNames(styles.container)}
      onClick={() => onclick(castel)}
    >
      <figure className={classNames(styles.figure)}>
        <Image
          src={`${castel.picture}`}
          alt={`Photo du ${castel.name}`}
          fill
          style={{ objectFit: "cover" }}
        />
        <figcaption className={classNames(styles.figureCaption)}>
          {castel.name}
        </figcaption>
      </figure>
      <p>Plus d&apos;infos...</p>
    </article>
  );
}

export default CastelPreview;
