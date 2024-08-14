import React, { useState, useRef } from "react";
import { useInstantSearch, useSearchBox } from "react-instantsearch";
import { IoSearchOutline } from "react-icons/io5";

const CustomSearchBox = (props) => {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  const isSearchStalled = status === "stalled";

  function setQuery(newQuery) {
    setInputValue(newQuery);

    props.handleQuery(newQuery);

    refine(newQuery);
  }

  return (
    <form
      className="flex items-center max-lg:w-full max-md:mt-2 shadow-custom-shadow border px-2 rounded-md py-2"
      action=""
      role="search"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (inputRef.current) {
          inputRef.current.blur();
        }
      }}
      onReset={(event) => {
        event.preventDefault();
        event.stopPropagation();

        setQuery("");

        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <input
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Search for products"
        spellCheck={false}
        maxLength={512}
        type="search"
        value={inputValue}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
        autoFocus
        className="p-2 w-96 max-xl:w-72 max-lg:w-60 max-md:w-full mr-2"
      />
      {/* <button type="submit" className=""> */}
      <span className="bg-red-400 p-2 text-white rounded-md">
        <IoSearchOutline size={20} />
      </span>
      {/* </button> */}
      {/* <button type="reset" hidden={inputValue.length === 0 || isSearchStalled}>
        Reset
      </button>
      <span hidden={!isSearchStalled}>Searching…</span> */}
    </form>
  );
};

export default CustomSearchBox;
