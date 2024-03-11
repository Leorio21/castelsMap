"use client";
import React, { useRef, useState } from "react";
import classNames from "classnames";
import styles from "./page.module.css";
import castelsJson from "../public/castels.json";
import countrys from "../public/countrys.json";
import CastelPreview from "./Components/Castel/CastelPreview/CastelPreview";
import type { Castel } from "./Type/Castel";
import CastelInfo from "./Components/Castel/CastelInfo/CastelInfo";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

export default function Home(): React.JSX.Element {
  const [castels, setCastels] = useState<Castel[]>(castelsJson);
  const [castel, setCastel] = useState<Castel | null>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const TestMap = dynamic(() => import("./Components/Map/Map"), {
    ssr: false,
  });

  const selectCastel = (castelSelected: Castel): void => {
    setCastel(castelSelected);
  };

  const selectChangeHandler = (): void => {
    setCastel(null);
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
      <section>
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
        <div className={classNames(styles.castelsContainer)}>
          {castels.map((castel) => (
            <CastelPreview
              key={castel.name}
              castel={castel}
              onclick={selectCastel}
            />
          ))}
        </div>
      </section>
      <section>
        {castel !== null ? (
          <CastelInfo castel={castel} />
        ) : (
          <TestMap castels={castels} location={[0, 0]} />
        )}
      </section>
    </main>
  );
}
