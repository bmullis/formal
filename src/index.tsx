import * as React from "react";

interface FormProps {
  initialValues: FormValue;
  validationSchema: ValidationRecord[];
  isInitiallyValid?: boolean;
  children: any;
  onSubmit: Function;
}

interface FormValue {
  [key: string]: string;
}

interface ValidationRecord {
  field: string;
  required: boolean;
}

interface ErrorRecord {
  field: string;
  message: string;
}

const Formal = ({
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
  const [errors, setErrors] = React.useState<ErrorRecord[]>([]);

  const validateForm = React.useCallback(async () => {
    let newErrors: ErrorRecord[] = [];

    validationSchema.forEach((item: { required: boolean; field: string }) => {
      if (item.required && formData[item.field] === "") {
        newErrors.push({
          field: item.field,
          message: "This field is required",
        });
      }
    });

    await setErrors(newErrors);
  }, [formData]);

  React.useEffect(() => {
    setIsValid(!errors.length ? true : false);
  }, [errors]);

  React.useEffect(() => {
    validateForm();
  }, [formData]);

  React.useEffect(() => {
    if (isSubmitting && isValid) {
      onSubmit(setIsSubmitting, formData);
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
    <form>
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

export default Formal;
