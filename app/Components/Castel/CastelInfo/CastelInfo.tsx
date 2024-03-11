import React from "react";
import type { Castel } from "@/app/Type/Castel";

interface CastelInfoProps {
  castel: Castel;
}

function CastelInfo({ castel }: CastelInfoProps): React.JSX.Element {
  return (
    <div>
      {castel.name} - {castel.country}
    </div>
  );
}

export default CastelInfo;
