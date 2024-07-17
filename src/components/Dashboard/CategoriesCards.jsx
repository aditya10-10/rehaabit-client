import { FaRegEdit } from "react-icons/fa";

const CategoriesCards = ({categories, currentPage, cardsPerPage}) => {
  // console.log(categories)
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCategories = categories.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCategories.map((category) => {
          const { _id, name, icon, subCategory } = category;

          return (
            <div
              key={_id}
              className="flex items-center flex-col bg-white shadow-custom-shadow rounded-lg p-4"
            >
              <div className="relative inline-block mb-6">
                <img
                  src={icon}
                  alt={name}
                  className="h-20 w-20 rounded-full"
                />
                <button className="absolute bottom-0 right-[10px] transform translate-x-1/2 bg-blue-500 rounded-full p-1 text-white text-sm">
                  <FaRegEdit />
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold mb-2 mr-2">{name}</h3>
                <button className="bg-blue-500 rounded-full p-1 text-white text-sm">
                  <FaRegEdit />
                </button>
              </div>

              <button className="bg-red-600 text-white rounded-[5px] py-2 px-4 text-sm">
                Delete
              </button>
            </div>
          );
        })}
      </div>
  )
}

export default CategoriesCards