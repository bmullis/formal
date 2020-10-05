# Formal 🤵🏼

A very sophisticated form state manager for React. 🎩

Note: Decided to use Yup for form validation. An example of usage is below and you can learn more about Yup here: https://github.com/jquense/yup

## Getting Started

#

### Installing

`npm i formal-react-forms`

or

`yarn add formal-react-forms`

#

## Example Usage

### Imports

```js
import Formal, {
  generateError,
  FormalProps,
  FormalActionsProps,
} from "formal-react-forms";
import * as Yup from "yup";
```

### Create a Validation Schema with Yup

```js
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string(),
  email: Yup.string()
    .email("Please provide a valid email address")
    .required("Email is requried"),
  password: Yup.string()
    .min(8, "Passwords must be between 8 and 50 characters")
    .max(50, "Passwords must be between 8 and 50 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(8, "Passwords must be between 8 and 50 characters")
    .max(50, "Passwords must be between 8 and 50 characters")
    .required("Please confirm your password"),
});
```

### Setup You Initial Values

```js
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
```

### Create the Function to Call After Form Submit

```js
const onSubmit = (actions: FormalActionsProps, values: InitialValuesProps) => {
  // Make Axios (or equivalent) call
  // You have access to:
  values: {}
  // an object with the values from the form
  actions: {
    setIsSubmitting, // set state action to update isSubmitting state
    setErrors; // set state action to update form errors
  }
  // Examples:
  // actions.setErrors([newError]);
  // actions.setIsSubmitting(false);

  // Convert server returned errors to Yup errors with:
  const newError = generateError({
    message: "The passwords do not match",
    path: "confirmPassword",
  });
};
```

### Example JSX form

```js
<Formal
  isInitiallyValid={true}
  validationSchema={validationSchema}
  initialValues={initialValues}
  onSubmit={(actions, values) => onSubmit(actions, values)}
>
  {({ isValid, errors, values, onChangeValues, isSubmitting }: FormalProps) => {
    return (
      <div>
        <input
          type="text"
          value={values.firstName}
          placeholder="First Name"
          onChange={({ target: { value } }) => {
            onChangeValues({ firstName: value });
          }}
        />
        // See example function below
        {getError({ field: "firstName", errors })}
      </div>

      <div>
        <input
          type="text"
          value={values.lastName}
          placeholder="Last Name"
          onChange={({ target: { value } }) => {
            onChangeValues({ lastName: value });
          }}
        />
        // See example function below
        {getError({ field: "lastName", errors })}
      </div>

      <div>
        <input
          type="email"
          value={values.email}
          placeholder="Email Address"
          onChange={({ target: { value } }) => {
            onChangeValues({ email: value });
          }}
        />
        // See example function below
        {getError({ field: "email", errors })}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={({ target: { value } }) =>
            onChangeValues({ password: value })
          }
        />
        // See example function below
        {getError({ field: "password", errors })}
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={({ target: { value } }) =>
            onChangeValues({ confirmPassword: value })
          }
        />
        // See example function below
        {getError({ field: "confirmPassword", errors })}
      </div>

      <div>
        <button type="submit" disabled={!isValid}>
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </div>
    );
  }}
</Formal>
```

### Example Error Extractor Function

```js
const getError = ({
  field,
  errors,
}: {
  field: string,
  errors: Yup.ValidationError[],
}) => {
  const error = errors.find((error) => error.path === field);
  return error ? <span>{error.message}</span> : null;
};
```

#

## Authors

- **Brian Mullis** - [https://github.com/bmullis](https://github.com/bmullis)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
