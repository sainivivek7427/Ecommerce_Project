export function createLoginPayload(email, password) {
  return {
    email: email,
    password: password,
  };
}