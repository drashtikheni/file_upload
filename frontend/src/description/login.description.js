export const formFieldTypes = {
  input: 'input',
  password: 'password',
  number: 'number',
}

export const formFields = [
  {
    label: 'Username',
    name: 'username',
    type: formFieldTypes.input,
    rules: [
      {
        required: true,
        message: 'Please input your username!',
      },
    ],
  },
  {
    label: 'Password',
    name: 'password',
    type: formFieldTypes.password,
    rules: [
      {
        required: true,
        message: 'Please input your password!',
      },
    ],
  },
]

export const loginLabel = 'Login'

export const logoutLabel = 'Logout'

export const createAnAccount = "Don't have account? Create an account"
