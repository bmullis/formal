# Formal 🤵🏼

A very sophisticated form state manager for React. 🎩

## Getting Started

### Installing

`npm i formal-react-forms`

OR

`yarn add formal-react-forms`

### Usage Example

#### Import

```
import Formal from "formal-react-forms";
```

#### Example Usage

```js
<Formal
  isInitiallyValid={true}
  initialValues={{
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }}
  validationSchema={[
    { field: "firstName", required: true },
    { field: "lastName", required: false },
    { field: "email", required: true },
    { field: "password", required: true },
    { field: "confirmPassword", required: true },
  ]}
  onSubmit={(
    actions: { setIsSubmitting: Function, setErrors: Function },
    values: {
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      confirmPassword: string,
    }
  ) => onSubmit(actions, values)}
>
  {({
    isValid,
    errors,
    values,
    handleFormSubmit,
    onChangeValues,
    isSubmitting,
  }: any) => {
    return (
      <>
        <div>
          <input
            type="text"
            value={values.firstName}
            placeholder="First Name"
            onChange={({ target: { value } }) => {
              onChangeValues({ firstName: value });
            }}
          />
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
          {getError({ field: "confirmPassword", errors })}
        </div>

        <div>
          <button type="submit" onClick={handleFormSubmit} disabled={!isValid}>
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </div>
      </>
    );
  }}
</Formal>
```

## Authors

- **Brian Mullis** - [https://github.com/bmullis](https://github.com/bmullis)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
