import validator from "validator";

export const validateSignUp = (req) => {
  const { name, address, email, password } = req.body;

  if (!name) {
    throw new Error("Name is required");
  } else if (name.length < 20 || name.length > 60) {
    throw new Error("Name must be between 20 and 60 characters");
  }

  if (!address) {
    throw new Error("Address is required");
  } else if (address.length > 400) {
    throw new Error("Address must not exceed 400 characters");
  }

  if (!email) {
    throw new Error("Email is required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!password) {
    throw new Error("Password is required");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

export const validatePassword = (req) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new Error("Both current and new password are required");
  }

  if (currentPassword === newPassword) {
    throw new Error("New password must be different from current password");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Please enter a strong password");
  }
};