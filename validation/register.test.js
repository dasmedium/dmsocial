const register = require("./register");
const isEmpty = require("./is-empty");

test("Test that function exists", () => {
  expect(register()).toBeDefined();
});

test("Test that we get isValid with inputs", () => {
  const data = {
    name: "Angel Antonio",
    email: "angel-antonio@live.com",
    password: "password",
    password2: "password"
  };
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  expect(register(data)).toEqual({ errors: {}, isValid: true });
});

test("Test that we get !isValid with wrong inputs", () => {
  const data = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  expect(register(data)).toEqual({
    errors: {
      name: "Name field is required",
      email: "Email field is required",
      password: "Password field is required",
      password2: "Confirm Password field is required"
    },
    isValid: false
  });
});
