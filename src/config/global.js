const RESPONSE = {
  SUCCESS: {
    code: 200,
    message: "Everything worked as expected",
  },
  REQUIRED: {
    code: 201,
    message: "is required",
  },
  INVALID: {
    code: 202,
    message: "is invalid",
  },
  ALRDY_EXISTS: {
    code: 203,
    message: "already exists",
  },
  NOT_FOUND: {
    code: 204,
    message: "not found",
  },
  UNKNOWN_ERR: {
    code: 500,
    message: "Something went wrong!!",
  },
};
export default RESPONSE;
