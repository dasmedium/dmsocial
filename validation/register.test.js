const register = require("./register");
const isEmpty = require("./is-empty");

let data = {name: null, email: null, password: null, password2: null};

beforeEach(() => {
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
})

test("Test that function exists", () => {
  expect(register(data)).toBeDefined();
});

test("We get isValid with inputs", () => {
  const data = {
    name: "Angel Antonio",
    email: "angel-antonio@live.com",
    password: "password",
    password2: "password"
  };
  

  expect(register(data)).toEqual({ errors: {}, isValid: true });
});

test("We get !isValid with no inputs", () => {
  
  
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

test("We get !isValid with WRONG inputs", () => {
  const data = {
    name: "A",
    email: "antonio@bla",
    password: "12345",
    password2: "54321"
  }
  
  expect(register(data)).toEqual({
    errors: {
      name: "Name must be between 2 and 30 characters",
      email: "Email is invalid",
      password: "Password must be at least 6 characters",
      password2: "Passwords must match"
    },
    isValid: false
  });
});
