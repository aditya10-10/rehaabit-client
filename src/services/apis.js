const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/sendOTP",
  SIGNUP_API: BASE_URL + "/signup",
  LOGIN_API: BASE_URL + "/login",
  SHOW_ALL_CATEGORIES_API: BASE_URL + "/showAllCategories",
  CREATE_CATEGORY_API: BASE_URL + "/createCategory",
  DELETE_CATEGORY_API: BASE_URL + "/deleteCategory",
  UPDATE_CATEGORY_NAME_API: BASE_URL + "/updateCategoryName",
  UPDATE_CATEGORY_ICON_API: BASE_URL + "/updateCategoryIcon",
  SHOW_ALL_SUB_CATEGORIES_API: BASE_URL + "/showAllSubCategories",
  UPDATE_SUB_CATEGORY_NAME_API: BASE_URL + "/updateSubCategoryName",
  ADD_SUB_CATEGORY_API: BASE_URL + "/addSubCategory",
  UPDATE_SUB_CATEGORY_ICON_API: BASE_URL + "/updateSubCategoryIcon",
  GET_SUB_CATEGORIES_BY_CATEGORY_API: BASE_URL + "/getSubCategoriesByCategory",
  DELETE_SUB_CATEGORY_API: BASE_URL + "/deleteSubCategory",
};

//  SERVICE ENDPOINTS
export const serviceEndpoints = {
  CREATE_SERVICE_API: BASE_URL + "/createService",
  GET_FULL_SERVICE_DETAILS_API: BASE_URL + "/getFullServiceDetails",
  GET_ALL_SERVICES_API: BASE_URL + "/getAllServices",
  GET_ALL_NON_PRICED_AND_PUBLISHED_SERVICE_API:
    BASE_URL + "/getAllNoPricedPublishedServices",
  GET_ALL_PUBLISHED_SERVICES_API: BASE_URL + "/getAllPublishedServices",
  EDIT_SERVICE_API: BASE_URL + "/editService",
  DELETE_SERVICE_API: BASE_URL + "/deleteService",
  CREATE_INCLUDE_API: BASE_URL + "/createInclude",
  DELETE_INCLUDE_API: BASE_URL + "/deleteInclude",
  UPDATE_INCLUDE_API: BASE_URL + "/updateInclude",
  CREATE_EXCLUDE_API: BASE_URL + "/createExclude",
  DELETE_EXCLUDE_API: BASE_URL + "/deleteExclude",
  UPDATE_EXCLUDE_API: BASE_URL + "/updateExclude",
  CREATE_FAQ_API: BASE_URL + "/createFAQ",
  UPDATE_FAQ_API: BASE_URL + "/updateFAQ",
  GET_FAQ_API: BASE_URL + "/getAllFAQs",
  DELETE_FAQ_API: BASE_URL + "/deleteFAQ",
  CREATE_HOW_DOES_IT_WORKS_API: BASE_URL + "/createHowDoesItWorks",
  DELETE_HOW_DOES_IT_WORKS_API: BASE_URL + "/deleteHowDoesItWorks",
  UPDATE_HOW_DOES_IT_WORKS_API: BASE_URL + "/updateHowDoesItWorks",
  GET_TOTAL_SERVICES_COUNT_API: BASE_URL + "/getTotalServicesCount",
  GET_SERVICE_RATING_AND_REVIEWS_API: BASE_URL + "/getServiceRatingAndReviews",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/getUserDetails",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/updateProfile",
  DELETE_PROFILE_API: BASE_URL + "/deleteProfile",
};

// CART ENDPOINTS
export const cartEndpoints = {
  GET_ALL_CART_SERVICES_API: BASE_URL + "/getAllCartServices",
  UPDATE_CART_API: BASE_URL + "/updateCart",
  REMOVE_FROM_CART_API: BASE_URL + "/removeFromCart",
  ADD_TO_CART_API: BASE_URL + "/addToCart",
  UPDATE_CART_FROM_LOCAL_STORAGE_API: BASE_URL + "/updateCartFromLocalStorage",
};

// ADDRESS ENDPOINTS
export const addressEndpoints = {
  GET_USER_ADDRESSES_API: BASE_URL + "/getUserAddresses",
  UPDATE_ADDRESS_API: BASE_URL + "/updateAddress",
  DELETE_ADDRESS_API: BASE_URL + "/deleteAddress",
  ADD_ADDRESS_API: BASE_URL + "/addAddress",
};

// ORDER ENDPOINTS
export const orderEndpoints = {
  PLACE_ORDER_API: BASE_URL + "/placeOrder",
  PURCHASE_SERVICE_API: BASE_URL + "/purchaseOrder",
  GET_USER_ORDERS_API: BASE_URL + "/getUserOrders",
  GET_ALL_ORDERS_API: BASE_URL + "/getAllOrders",
  GET_REVENUE_API: BASE_URL + "/getRevenue",
  GET_PENDING_ORDERS_API_COUNT: BASE_URL + "/getPendingOrdersCount",
  UPDATE_ORDER_STATUS_API: BASE_URL + "/updateorderstatus",
  CANCEL_ORDER_API: BASE_URL + "/cancelOrder",
};

//  PAYMENT ENDPOINTS
export const paymentEndpoints = {
  SERVICE_PAYMENT_API: BASE_URL + "/processPayment",
  VERIFY_PAYMENT_API: BASE_URL + "/verifyPayment",
};

// EMAIL ENDPOINTS
export const emailEndpoints = {
  SEND_EMAIL_OTP_API: BASE_URL + "/send-email-otp",
  VERIFY_EMAIL_OTP_API: BASE_URL + "/verifyEmailOTP",
};

// PARTNER ENDPOINTS
export const partnerEndpoints = {
  ADD_PARTNER_INFORMATION_API: BASE_URL + "/addPartnerInformation",
  GET_ALL_PARTNERS_API: BASE_URL + "/getAllPartners",
  TOTAL_PARTNER_COUNT_API: BASE_URL + "/getPartnerCount",
};

// CONTACT ENDPOINTS
export const contactEndpoints = {
  CONTACT_API: BASE_URL + "/contact", // For submitting a contact form
  GET_ALL_CONTACTS_API: BASE_URL + "/getAllContacts", // For admin to get all contact data
  GET_CONTACT_BY_ID_API: BASE_URL + "/getContactById", // Fetch specific contact by contactId
  UPDATE_CONTACT_STATUS_API: BASE_URL + "/updateContactStatusAndAssignment", // Admin updates contact status, assignment, priority
  ADMIN_RESPONSE_API: BASE_URL + "/adminResponse", // Admin adds a response to a contact
  DELETE_CONTACT_API: BASE_URL + "/deleteContact", // Admin deletes a contact
};

// CAREERS ENDPOINTS
export const careersEndpoints = {
  ADD_CANDIDATE_INFORMATION_API: BASE_URL + "/carrer/addCandidateInformation",
  GET_ALL_CAREERS_API: BASE_URL + "/carrer/all",
  GET_CAREER_BY_ID_API: BASE_URL + "/carrer/:id",
  DELETE_CAREER_API: BASE_URL + "/carrer/:id",
};

// USERS ENDPOINTS
export const usersEndpoints = {
  GET_ALL_USERS_API: BASE_URL + "/getAllUsers",
  GET_USER_API: BASE_URL + "/getUser",
  UPDATE_USER_DETAILS_API: BASE_URL + "/updateUserDetails",
  DELETE_USER_API: BASE_URL + "/deleteUser",
  CREATE_NEW_USER_API: BASE_URL + "/createNewUser",
  TOTAL_USER_COUNT_API: BASE_URL + "/getUserCount",
};

// RATING AND REVIEWS ENDPOINTS
export const ratingAndReviewsEndpoints = {
  CREATE_RATING_API: BASE_URL + "/createRating",
  GET_AVERAGE_RATING_API: BASE_URL + "/getAverageRating",
  GET_ALL_RATING_API: BASE_URL + "/getAllRating",
  GET_USERS_RATING_AND_REVIEWS_API: BASE_URL + "/getUsersRatingAndReviews",
  GET_USERS_RATING_AND_REVIEWS_WITH_USERNAME_API:
    BASE_URL + "/getAllRatingsAndReviewsWithUserNames",
  GET_ALL_RATING_AND_AVERAGE_API: BASE_URL + "/getAllRatingsAndAverage",
};

// ENQUIRE NOW - NON PRICED SERVICES
export const enquireEndpoints = {
  ENQUIRE_API: BASE_URL + "/enquire",
  GET_ALL_ENQUIRIES_API: BASE_URL + "/getAllEnquiries",
  GET_ENQUIRY_BY_ID_API: BASE_URL + "/getEnquiryById",
  UPDATE_ENQUIRY_AND_STATUS_ASSIGNMENT_API:
    BASE_URL + "/updateEnquiryAndStatusAssignment",
  ADMIN_RESPONSE_API: BASE_URL + "/adminResponseEnquiry",
  DELETE_ENQUIRY_API: BASE_URL + "/deleteEnquiry",
};

// LOCATION ENDPOINTS
export const locationEndpoints = {
  GET_LOCATION_SUGGESTIONS_API: BASE_URL + "/getLocationSuggestions",
};
