import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Home/Navbar";
import { showAllCategories } from "../slices/categorySlice";
import { getAllServices } from "../slices/serviceSlice";
import { GoStarFill } from "react-icons/go";
import { BsClock } from "react-icons/bs";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { allServices } = useSelector((state) => state.service);
  const categoryRefs = useRef({});

  useEffect(() => {
    dispatch(showAllCategories());
    dispatch(getAllServices());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    categoryRefs.current[categoryId]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-between px-20 max-md:flex-col gap-5 max-lg:px-10">
        <div className="border-2 rounded-lg bg-gray-100 p-4 h-fit">
          <h1 className="text-4xl text-center">Select Category</h1>

          <div className="grid grid-cols-3 p-2 gap-4 max-md:flex max-md:flex-nowrap max-md:overflow-x-auto w-full max-xl:grid-cols-3 max-lg:grid-cols-2">
            {categories.map((category) => {
              const { _id, name, icon } = category;

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
                  <span>{name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-2 rounded-lg bg-gray-100 p-4 w-[60%] max-md:w-full">
          <h1 className="text-4xl text-center">Selected Category</h1>

          <div className="h-[75vh] overflow-y-auto">
            {categories.map((category) => {
              const { _id, name } = category;

              const services = allServices.filter(
                (service) => service.categoryId === _id
              );

              return services.length > 0 ? (
                <div
                  key={_id}
                  ref={(e) => (categoryRefs.current[_id] = e)}
                  className="mb-8"
                >
                  <h1 className="text-2xl mb-4 ml-6">{name}</h1>

                  <div className="grid grid-cols-1 p-2 gap-4 w-full">
                    {services.map((service) => {
                      const {
                        _id,
                        serviceName,
                        thumbnail,
                        serviceDescription,
                      } = service;

                      return (
                        <div
                          key={_id}
                          className="flex items-center hover:shadow-custom-shadow px-4 py-2 rounded-lg bg-white"
                        >
                          <img
                            src={thumbnail}
                            alt="Icon"
                            className="h-40 w-44 rounded-lg mr-4"
                          />

                          <div className="flex flex-col">
                            <span className="text-xl mb-2">{serviceName}</span>
                            <div className="flex items-center mb-2">
                              <span>4.5</span>
                              <GoStarFill className="text-yellow-400 mr-2" />
                              <span>(4.17k reviews)</span>
                            </div>
                            <div className="flex items-center text-[#006049] mb-2">
                              <span className="mr-2">₹4.5</span>
                              <BsClock className="mr-1" />
                              <span>30 mins</span>
                            </div>

                            <span className="mb-1">{serviceDescription}</span>
                            {/* <span className="mb-1">
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Libero nesciunt explicabo aut?
                              Pariatur, inventore officia ut eos facilis quos
                              architecto voluptas repudiandae omnis iste eaque.
                              Optio ipsa, reprehenderit minima necessitatibus a
                              quis sed? Perferendis voluptatum quaerat veritatis
                              inventore ab! Esse.
                            </span> */}

                            <div className="flex gap-2">
                              <button className="bg-[#B54F45] p-1 rounded-md">
                                Buy Now
                              </button>
                              <button className="bg-[#E8C64C] p-1 rounded-md">
                                Add to Cart
                              </button>
                            </div>
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
      </div>
    </>
  );
};

export default Categories;
