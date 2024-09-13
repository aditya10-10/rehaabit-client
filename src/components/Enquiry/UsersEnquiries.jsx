import NothingToShow from "../NothingToShow";
import EnquiriesList from "./EnquiriesList";
import { getAllEnquiries } from "../../slices/enquireSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsersEnquiries = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);
  const { enquiries } = useSelector((state) => state.enquire);
  const { user } = useSelector((state) => state.profile);

  // console.log(orders);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [searchContact, setSearchContact] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("All");
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleContactSearch = (e) => {
    setSearchContact(e.target.value);
  };

  useEffect(() => {
    if (user.accountType === "Admin") {
      dispatch(getAllEnquiries());
    }
  }, [dispatch, user]);

  // const filteredOrders = enquires.filter((order) => {
  //   const categoryMatch =
  //     selectedCategory === "All" ||
  //     order.services.some(
  //       (service) => service.serviceId.categoryId === selectedCategory
  //     );

  //   const subcategoryMatch =
  //     selectedSubcategory === "All" ||
  //     order.services.some(
  //       (service) => service.serviceId.subCategoryId === selectedSubcategory
  //     );

  //   const contactMatch =
  //     searchContact === "" || order.user.contactNumber?.includes(searchContact);

  //   return categoryMatch && subcategoryMatch && contactMatch;
  // });

  return (
    <div className="flex flex-col items-center w-full p-10 max-md:p-4 max-sm:p-2">
      <nav className="flex w-full justify-between">
        <div className="flex w-full items-center max-sm:flex-col max-sm:justify-center">
          <h1 className="text-4xl max-md:text-2xl font-semibold mb-6 max-sm:mb-4">
            Users Enquiries
          </h1>

          <div className="max-sm:flex max-sm:w-full max-sm:justify-center max-sm:flex-col">
            {/* Search by Category */}
            {/* <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="shadow-custom-shadow border-none rounded-[5px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ml-6 mb-6 max-sm:ml-0 max-sm:mb-4"
            >
              <option value="All">All Categories</option>
              {categories.map(({ _id, name }) => (
                <option key={_id} value={_id}>
                  {name}
                </option>
              ))}
            </select>

            {/* Search by Subcategory */}
            <select
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              className="shadow-custom-shadow border-none rounded-[5px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ml-6 mb-6 max-sm:ml-0 max-sm:mb-4"
            >
              <option value="All">All Subcategories</option>
              {subcategories.map(({ _id, subCategoryName }) => (
                <option key={_id} value={_id}>
                  {subCategoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Search by Contact Number */}
          {user.accountType === "Admin" && (
            <div className="ml-6 mb-6">
              <input
                type="text"
                value={searchContact}
                onChange={handleContactSearch}
                placeholder="Search by Contact..."
                className="shadow-custom-shadow border rounded-[5px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
        </div>
      </nav>

      {enquiries?.length === 0 ? (
        <NothingToShow text="Orders" btnText="shopping" />
      ) : (
        <div className="w-full border rounded-lg">
          <EnquiriesList enquiries={enquiries} />
        </div>
      )}
    </div>
  );
};

export default UsersEnquiries;
