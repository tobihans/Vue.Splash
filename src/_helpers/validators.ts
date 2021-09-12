/**
 * Regex for various input fields validation
 */
 enum ValidationRegex {
  USERNAME = '^[a-zA-Z]{4}[a-zA-Z0-9]*',
  EMAIL = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
  PASSWORD = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
}

/**
 * Validates an email
 * @param input the content to validate
 * @returns the validation result
 */
export function emailValidator(input: string): InputValidationResult {
  if ((new RegExp(ValidationRegex.EMAIL)).test(input)) {
    return true;
  }
  return {
    state: 'danger',
    title: 'Invalid email address.',
  };
}

/**
 * Validates an username
 * @param input the content to validate
 * @returns the validation result
 */
export function usernameValidator(input: string): InputValidationResult {
  if ((new RegExp(ValidationRegex.USERNAME)).test(input)) {
    return true;
  }
  return {
    state: 'danger',
    title: 'Username should:',
    rules: [
      'start with 4 letters',
    ],
  };
}

/**
 * Validates a password
 * @param input the content to validate
 * @returns the validation result
 */
export function passwordValidator(input: string): InputValidationResult {
  if ((new RegExp(ValidationRegex.PASSWORD)).test(input)) {
    return true;
  }
  return {
    state: 'danger',
    title: 'Your password must contain at least 1:',
    rules: [
      'lowercase (a..z)',
      'uppercase (A..Z)',
      'digit (0..9)',
      'non alphanumeric character (@#$%^&..)',
      'be at least 8 length',
    ],
  };
}

/**
 * Validates an email or username
 * @param input
 * @returns the validation result
 */
export function validateUsernameOrEmail(input: string): InputValidationResult {
  // If there is an @ sign, it should probably be an email
  if (input.indexOf('@') > -1) {
    return emailValidator(input);
  }
  return usernameValidator(input);
}
