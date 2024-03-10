"use client";
import React, { useRef, useState } from "react";
import classNames from "classnames";
import styles from "./page.module.css";
import castelsJson from "../public/castels.json";
import countrys from "../public/countrys.json";
import CastelPreview from "./Components/Castel/CastelPreview/CastelPreview";
import type { Castel } from "./Type/Castel";

export default function Home(): React.JSX.Element {
  const [castels, setCastels] = useState<Castel[]>(castelsJson);
  const selectRef = useRef<HTMLSelectElement>(null);

  const selectChangeHandler = (): void => {
    setCastels(() => {
      if (selectRef === null || selectRef.current?.value === "all") {
        return castelsJson;
      }
      return castelsJson.filter(
        (castel) => castel.country === selectRef.current?.value,
      );
    });
  };

  return (
    <main>
      <label className={classNames(styles.filter)}>
        Pays :
        <select id="countrys" ref={selectRef} onChange={selectChangeHandler}>
          <option value="all">Tous</option>
          {countrys.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
      <section className={classNames(styles.castelsContainer)}>
        {castels.map((castel) => (
          <CastelPreview key={castel.name} castel={castel} />
        ))}
      </section>
    </main>
  );
}
