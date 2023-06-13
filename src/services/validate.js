import validator from "validator";

const getErrorMessage = (name, value) => {
  if (name === "email") return !validator.isEmail(value);
  if (name === "password")
    return !validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
    });
  if (name === "first_name" || name === "last_name") return !value.length;
  return false;
};

export default getErrorMessage;
