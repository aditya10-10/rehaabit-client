import { Highlight } from "react-instantsearch";
import { getPropertyByPath } from "instantsearch.js/es/lib/utils";

export const Hit = ({ hit }) => {
  return (
    <article className="flex items-center px-4 py-2 border-b hover:bg-gray-100 cursor-pointer w-full">
      {/* <img src={hit.thumbnailImage} alt={hit.name} className="w-10 h-10 object-cover rounded-md mr-3" /> */}
      <div className="hit-name w-full">
        <div className="text-sm font-medium text-gray-900">
          <Highlight attribute="name" hit={hit} />
        </div>
        <div className="hit-type text-xs text-gray-500">
          <Highlight attribute="type" hit={hit} />
        </div>
        {/* <div className="hit-shortDescription text-xs text-gray-500">
          <Highlight attribute="shortDescription" hit={hit} />
        </div> */}
      </div>
    </article>
  );
};
