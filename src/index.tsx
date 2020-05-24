import * as React from "react";
import * as Yup from "yup";

interface FormProps {
  initialValues: FormValue;
  validationSchema: Yup.ObjectSchema;
  isInitiallyValid?: boolean;
  children: ({}: FormalProps) => React.ReactNode;
  onSubmit: (actions: FormalActionsProps, formData: FormValue) => void;
}

interface FormValue {
  [key: string]: string;
}

export interface FormalActionsProps {
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<Yup.ValidationError[]>>;
}

export interface FormalProps {
  values: FormValue;
  onChangeValues: Function;
  handleFormSubmit: Function;
  isSubmitting: boolean;
  isValid: boolean;
  errors: Yup.ValidationError[];
}

export const generateError = ({
  message,
  path,
}: {
  message: string;
  path: string;
}) => {
  return new Yup.ValidationError(message, null, path);
};

export default ({
  initialValues,
  validationSchema,
  isInitiallyValid = true,
  children,
  onSubmit,
}: FormProps) => {
  const [formData, setFormData] = React.useState<FormValue>(initialValues);
  const [shouldValidate, setShouldValidate] = React.useState<boolean>(
    !isInitiallyValid
  );
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Yup.ValidationError[]>([]);

  const validateForm = React.useCallback(() => {
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setErrors([]);
      })
      .catch((error) => {
        setErrors(error.inner);
      });
  }, [formData]);

  React.useEffect(() => {
    setIsValid(!errors.length ? true : false);
  }, [errors]);

  React.useEffect(() => {
    validateForm();
  }, [formData]);

  React.useEffect(() => {
    if (isSubmitting && isValid) {
      onSubmit({ setIsSubmitting, setErrors }, formData);
    } else {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const handleFormSubmit = () => {
    setShouldValidate(true);
    setIsSubmitting(true);
  };

  const onChangeValues = (newValue: FormValue) => {
    setFormData({
      ...formData,
      ...newValue,
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit();
      }}
    >
      {children({
        values: formData,
        onChangeValues,
        handleFormSubmit,
        isSubmitting,
        isValid: !isValid && shouldValidate ? false : true,
        errors: !shouldValidate ? [] : errors,
      })}
    </form>
  );
};
