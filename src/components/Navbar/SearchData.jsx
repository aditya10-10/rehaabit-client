import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

const SearchData = ({ searchQuery, handleSearchQuery }) => {
  // console.log(searchQuery);
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);
  const { allServices } = useSelector((state) => state.service);
  const subcategoryData = subcategories?.map((subcategory) => ({
    ...subcategory,
    name: subcategory?.subCategoryName,
  }))||[];

  const allServicesData = allServices?.map((service) => ({
    ...service,
    name: service?.serviceName,
    description: service?.serviceDescription,
  }))||[];

  const Data = [...(categories||[]), ...(subcategoryData||[]), ...(allServicesData||[])];

  // console.log(Data);

  const options = {
    keys: ["name", "description"],
    threshold: 0.3, // Adjust threshold for fuzziness
  };

  const fuse = new Fuse(Data, options);

  const results = fuse?.search(searchQuery);
  // console.log(results); 
  const handleSearchClick = (data) => {
    const { _id, name, categoryId, subCategoryId, slugName } = data?.item;
    if (data?.item?.subCategoryName) {
      // If subcategory
      const slugName = categories?.find(category => category._id === categoryId)?.slugName;
      navigate(`/${slugName}`,{
        state: { scrollTo: "subcategory", subCategoryId: _id },
        replace: true,
      });
    } else if (data?.item?.serviceName) {
      // If service
      navigate("/", {
        state: { scrollTo: "services", serviceId: _id },
      });
    } else {
      // If category
      navigate(`/${slugName}`);
    }

    handleSearchQuery();
  };

  return (
    <>
      {searchQuery !== "" && results.length !== 0 && (
        <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white rounded-md shadow-custom-shadow max-h-60 overflow-y-auto p-4">
          {results?.map((data) => {
            const { _id, name } = data?.item;

            return (
              <div
                key={_id}
                onClick={() => handleSearchClick(data)}
                className="p-2 flex hover:bg-gray-100 cursor-pointer border rounded-md mb-2"
              >
                {name}
              </div>
            );
          })}
        </div>
      )}
      {searchQuery !== "" && results.length === 0 && (
        <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white rounded-md shadow-custom-shadow p-2">
          No results found.
        </div>
      )}
    </>
  );
};

export default SearchData;
