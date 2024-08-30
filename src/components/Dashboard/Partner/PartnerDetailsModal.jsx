import { AnimatePresence, motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";

const PartnerDetailsModal = ({
  isPartnerModalOpen,
  handlePartnerModal,
  partners,
}) => {
  return (
    <AnimatePresence>
      {isPartnerModalOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-lg:w-3/4 max-h-[70vh] overflow-y-auto relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={handlePartnerModal}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full"
            >
              <IoIosClose size={24} />
            </button>

            <div className="flex flex-col items-center justify-center w-full px-10 max-lg:px-4">
              {partners.map((partner) => {
                const {
                  _id,
                  firstName,
                  lastName,
                  dateOfBirth,
                  gender,
                  nationality,
                  identificationType,
                  identificationNumber,
                  email,
                  phoneNumber,
                  businessName,
                  businessStructure,
                  numberOfEmployees,
                  yearsOfExperience,
                  bankName,
                  accountNumber,
                  routingNumber,
                  address,
                  businessAddress,
                  alternativeContact,
                  servicesOffered,
                  serviceAreas,
                  photo,
                } = partner;

                return (
                  <div key={_id} className="w-full">
                    {photo && (
                      <div className="flex justify-center mb-4">
                        <img src={photo} alt="profile" className="w-32 h-32 rounded-full" />
                      </div>
                    )}
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {(firstName || lastName) && (
                          <tr>
                            <td className="font-bold p-2">Name:</td>
                            <td className="p-2">
                              {firstName} {lastName}
                            </td>
                          </tr>
                        )}
                        {phoneNumber && (
                          <tr>
                            <td className="font-bold p-2">Phone Number:</td>
                            <td className="p-2">{phoneNumber}</td>
                          </tr>
                        )}
                        {alternativeContact?.phoneNumber && (
                          <tr>
                            <td className="font-bold p-2">Alternative Contact:</td>
                            <td className="p-2">{alternativeContact.phoneNumber}</td>
                          </tr>
                        )}
                        {serviceAreas && serviceAreas.length > 0 && (
                          <tr>
                            <td className="font-bold p-2">Service Areas:</td>
                            <td className="p-2">
                              {serviceAreas.join(", ")}
                            </td>
                          </tr>
                        )}
                        {servicesOffered && servicesOffered.length > 0 && (
                          <tr>
                            <td className="font-bold p-2">Services Offered:</td>
                            <td className="p-2">
                              {servicesOffered.join(", ")}
                            </td>
                          </tr>
                        )}
                        {businessName && (
                          <tr>
                            <td className="font-bold p-2">Business Name:</td>
                            <td className="p-2">{businessName}</td>
                          </tr>
                        )}
                        {businessStructure && (
                          <tr>
                            <td className="font-bold p-2">Business Structure:</td>
                            <td className="p-2">{businessStructure}</td>
                          </tr>
                        )}
                        {dateOfBirth && (
                          <tr>
                            <td className="font-bold p-2">Date of Birth:</td>
                            <td className="p-2">{dateOfBirth}</td>
                          </tr>
                        )}
                        {gender && (
                          <tr>
                            <td className="font-bold p-2">Gender:</td>
                            <td className="p-2">{gender}</td>
                          </tr>
                        )}
                        {nationality && (
                          <tr>
                            <td className="font-bold p-2">Nationality:</td>
                            <td className="p-2">{nationality}</td>
                          </tr>
                        )}
                        {identificationType && (
                          <tr>
                            <td className="font-bold p-2">ID Type:</td>
                            <td className="p-2">{identificationType}</td>
                          </tr>
                        )}
                        {identificationNumber && (
                          <tr>
                            <td className="font-bold p-2">ID Number:</td>
                            <td className="p-2">{identificationNumber}</td>
                          </tr>
                        )}
                        {email && (
                          <tr>
                            <td className="font-bold p-2">Email:</td>
                            <td className="p-2">{email}</td>
                          </tr>
                        )}
                        {numberOfEmployees && (
                          <tr>
                            <td className="font-bold p-2">Number of Employees:</td>
                            <td className="p-2">{numberOfEmployees}</td>
                          </tr>
                        )}
                        {yearsOfExperience && (
                          <tr>
                            <td className="font-bold p-2">Years of Experience:</td>
                            <td className="p-2">{yearsOfExperience}</td>
                          </tr>
                        )}
                        {bankName && (
                          <tr>
                            <td className="font-bold p-2">Bank Name:</td>
                            <td className="p-2">{bankName}</td>
                          </tr>
                        )}
                        {accountNumber && (
                          <tr>
                            <td className="font-bold p-2">Account Number:</td>
                            <td className="p-2">{accountNumber}</td>
                          </tr>
                        )}
                        {routingNumber && (
                          <tr>
                            <td className="font-bold p-2">Routing Number:</td>
                            <td className="p-2">{routingNumber}</td>
                          </tr>
                        )}
                        {address && (
                          <tr>
                            <td className="font-bold p-2">Address:</td>
                            <td className="p-2">
                              {`${address.street}, ${address.city}, ${address.state}, ${address.country}`}
                            </td>
                          </tr>
                        )}
                        {businessAddress && (
                          <tr>
                            <td className="font-bold p-2">Business Address:</td>
                            <td className="p-2">
                              {`${businessAddress.street}, ${businessAddress.city}, ${businessAddress.state}, ${businessAddress.country}, ${businessAddress.pinCode}`}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PartnerDetailsModal;
