import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import {
  Hits,
  InstantSearch,
  SearchBox,
  Configure,
  useSearchBox,
} from "react-instantsearch";
import { Hit } from "./Hit";

import "./Search.css";

import CustomSearchBox from "./CustomSearchBox";
import { useState } from "react";

const searchClient = algoliasearch(
  "BOY7KEYJ5O",
  "495325d42c91dfd227a8d93ba5f48752"
);

export const Search = () => {
  const [query, setQuery] = useState("");

  const handleQuery = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <InstantSearch searchClient={searchClient} indexName="ecommerce">
      <Configure hitsPerPage={5} />
      <div className="relative w-full">
        {/* <SearchBox className="shadow-none" /> */}
        <CustomSearchBox handleQuery={handleQuery} />
        {query !== "" && (
          <div className="absolute z-50 w-full mt-1 rounded-md shadow-custom-shadow max-h-60 overflow-y-auto">
            <Hits hitComponent={Hit} />
          </div>
        )}
      </div>
    </InstantSearch>
  );
};
