class UserTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserTypeError";
  }
}

export default UserTypeError;
