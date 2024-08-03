import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Home/Navbar";
import { showAllCategories } from "../slices/categorySlice";
import { getAllServices } from "../slices/serviceSlice";
import { Link, useParams } from "react-router-dom";
import { getSubCategoriesByCategory } from "../slices/subCategorySlice";
import { ServiceCard } from "../components";

const Categories = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const categoryName = params.category;
  const categoryId = params.id;

  const { subCategoriesByCategory } = useSelector(
    (state) => state.subcategories
  );
  const { allServices } = useSelector((state) => state.service);
  const categoryRefs = useRef({});

  useEffect(() => {
    dispatch(showAllCategories());
    dispatch(getAllServices());
    dispatch(getSubCategoriesByCategory({ categoryId }));
  }, [dispatch, categoryId]);

  const handleCategoryClick = (subCategoryId) => {
    categoryRefs.current[subCategoryId]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-between px-20 max-md:flex-col gap-5 max-lg:px-10 max-sm:px-4">
        
        <div>
          <h1 className="text-5xl mb-10 max-sm:text-4xl">{categoryName}</h1>
          <div className="border-2 rounded-lg bg-gray-50 p-4 h-fit">
            <h1 className="text-4xl text-center max-lg:text-2xl">
              Select Sub-Category
            </h1>

            <div className="grid grid-cols-3 p-2 gap-4 max-md:flex max-md:flex-nowrap max-md:overflow-x-auto w-full max-xl:grid-cols-2 max-lg:grid-cols-1">
              {subCategoriesByCategory.map((category) => {
                const { _id, subCategoryName, icon } = category;

                return (
                  <div
                    key={_id}
                    className="flex flex-col items-center justify-center text-center hover:shadow-custom-shadow p-2 rounded-lg bg-white cursor-pointer flex-shrink-0 max-md:w-[150px]"
                    onClick={() => handleCategoryClick(_id)}
                  >
                    <img
                      src={icon}
                      alt="Icon"
                      className="h-10 w-10 rounded-full"
                    />
                    <span>{subCategoryName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-2 rounded-lg p-4 w-[60%] max-lg:w-[90%] max-md:w-full h-[75vh] overflow-y-auto">
          {subCategoriesByCategory.map((category) => {
            const { _id, subCategoryName } = category;

            const services = allServices.filter(
              (service) => service.subCategoryId === _id
            );

            return services.length > 0 ? (
              <div
                key={_id}
                ref={(e) => (categoryRefs.current[_id] = e)}
                className="mb-8"
              >
                <h1 className="text-2xl mb-4 ml-6">{subCategoryName}</h1>

                <div className="grid grid-cols-1 p-2 gap-4 max-lg:gap-2 w-full">
                  {services.map((service) => {
                    const { _id, serviceName, thumbnail, serviceDescription } =
                      service;

                    return (
                      <div
                        key={_id}
                        className="flex items-start flex-col shadow-custom-shadow px-4 py-2 rounded-lg bg-white w-full"
                      >
                        <Link to={`/service-details/${_id}`} className="w-full">
                          <ServiceCard {...service} />
                        </Link>

                        <div className="flex gap-2 justify-end w-full mt-4">
                          <button className="bg-red-400 px-4 py-2 rounded-md text-sm text-white">
                            Buy Now
                          </button>
                          <button className="bg-yellow-400 px-4 py-2 rounded-md text-sm">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;
