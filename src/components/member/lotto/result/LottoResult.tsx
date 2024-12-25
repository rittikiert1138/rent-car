import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import ResultCard from "./ResultCard";

const LottoResult = () => {
  const [results, setResults] = useState([]);

  const getLottoResult = async () => {
    try {
      const response = await api.get("/api/member/lotto/result");
      setResults(response.data.lottos);
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getLottoResult();
  }, []);

  console.log("results", results);

  return (
    <div className="grid grid-cols-12 gap-2 mb-2">
      {results.length > 0 ? (
        results.map((result, indexResult) => (
          <>
            <ResultCard result={result} />
          </>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default LottoResult;
