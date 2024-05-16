export const validateEmail = (email: string): string[] => {
  const errors: string[] = [];

  if (email && !email.includes("@")) {
    errors.push("Email must contain @");
  }

  if (email && !email.includes(".")) {
    errors.push("Email must contain a dot");
  }

  return errors;
};

export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (password && password.length < 6) {
    errors.push("Password must be atleast 6 characters long");
  }

  if (password && !/[A-Z]/.test(password)) {
    errors.push(`- at least one uppercase letter`);
  }

  if (password && !/[a-z]/.test(password)) {
    errors.push("- at least one lowercase letter");
  }

  if (password && !/\d/.test(password)) {
    errors.push("- at least one digit");
  }

  if (password && !/[!?+\-']/g.test(password)) {
    errors.push("- at least one special character (!?+-)");
  }

  return errors;
};
