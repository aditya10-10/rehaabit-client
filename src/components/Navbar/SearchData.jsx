import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import lunr from "lunr";
import Fuse from "fuse.js";

const SearchData = ({ searchQuery }) => {
  // console.log(searchQuery);
  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);
  const { allServices } = useSelector((state) => state.service);

  // console.log(categories)
  // console.log(subcategories)
  // console.log(allServices)

  const subcategoryData = subcategories.map((subcategory) => ({
    ...subcategory,
    name: subcategory.subCategoryName,
  }));

  const allServicesData = allServices.map((service) => ({
    ...service,
    name: service.serviceName,
    description: service.serviceDescription,
  }));

  const Data = [...categories, ...subcategoryData, ...allServicesData];

  console.log(Data);

  const options = {
    keys: ["name", "description"],
    threshold: 0.3, // Adjust threshold for fuzziness
  };

  const fuse = new Fuse(Data, options);

  const results = fuse.search(searchQuery);

  // const index = lunr(function () {
  //   this.ref("_id");
  //   this.field("name");

  //   Data.forEach((doc) => {
  //     this.add(doc);
  //   });
  // });

  // const results = index.search(searchQuery);

  // const filteredData = Data.filter((data) =>
  //   data.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  console.log(results);

  const filteredData = results;

  return (
    <>
      {searchQuery !== "" && filteredData.length !== 0 && (
        <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white rounded-md shadow-custom-shadow max-h-60 overflow-y-auto p-4">
          {filteredData.map((data) => {
            const { _id, name } = data.item;

            return (
              <Link
                key={_id}
                to={`/${name}/${_id}`}
                className="p-2 flex hover:bg-gray-100 cursor-pointer border rounded-md mb-2"
              >
                {name}
              </Link>
            );
          })}
        </div>
      )}

      {searchQuery !== "" && filteredData.length === 0 && (
        <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white rounded-md shadow-custom-shadow p-2">
          No results found.
        </div>
      )}
    </>
  );
};

export default SearchData;
