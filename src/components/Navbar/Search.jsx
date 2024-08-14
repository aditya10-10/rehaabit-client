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
  process.env.REACT_APP_ID,
  process.env.REACT_ALGOLIA_APP_ID
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
