import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NothingToShow from "../../NothingToShow";
import { getAllUsers } from "../../../slices/usersSlice";
import UsersList from "./UsersList";
import { FaPlus } from "react-icons/fa";
import NewUserModal from "./NewUserModal";

const Users = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [searchContact, setSearchContact] = useState("");
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

  const handleContactSearch = (e) => {
    setSearchContact(e.target.value);
  };

  const handleNewUserModal = () => {
    setIsNewUserModalOpen(!isNewUserModalOpen);
  };

  const filteredUsers = users.filter((user) => {
    const contactMatch =
      searchContact === "" || user.contactNumber?.includes(searchContact);

    return contactMatch;
  });

  return (
    <>
      <NewUserModal
        isNewUserModalOpen={isNewUserModalOpen}
        handleNewUserModal={handleNewUserModal}
      />

      <div className="flex flex-col items-center w-full p-10 max-md:p-4 max-sm:p-2">
        <nav className="flex w-full items-center justify-between">
          <div className="flex w-full items-center max-sm:flex-col max-sm:justify-center">
            <h1 className="text-4xl max-md:text-2xl font-semibold mb-6 max-sm:mb-4">
              Users
            </h1>

            {/* Search by Contact Number */}

            <div className="ml-6 mb-6">
              <input
                type="text"
                value={searchContact}
                onChange={handleContactSearch}
                placeholder="Search by Contact..."
                className="shadow-custom-shadow border rounded-[5px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <button
            className="bg-[#0C7FDA] text-white rounded-md px-4 py-2 font-semibold"
            onClick={handleNewUserModal}
          >
            New
          </button>
        </nav>

        {/* USERS LIST */}
        {filteredUsers?.length === 0 ? (
          <NothingToShow text="Users" btnText="" />
        ) : (
          <div className="w-full border rounded-lg">
            <UsersList users={filteredUsers} />
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
