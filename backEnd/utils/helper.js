// Example utility functions for your app

// Format a date as a human-readable string
exports.formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

// Validate an email address
exports.isValidEmail = (email) => {
  // You can use a regular expression or a validation library here
  // Example regular expression for a basic email format:
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

// Hash a password using bcrypt
exports.hashPassword = (password) => {
  // You should use a secure password hashing library like bcrypt
  // Example bcrypt usage:
  // const saltRounds = 10;
  // const hashedPassword = bcrypt.hashSync(password, saltRounds);
  // return hashedPassword;
};

// Verify a password against a hashed password
exports.verifyPassword = (password, hashedPassword) => {
  // You should use bcrypt for secure password verification
  // Example bcrypt usage:
  // const result = bcrypt.compareSync(password, hashedPassword);
  // return result;
};
