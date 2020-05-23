import * as React from "react";

interface FormProps {
  initialValues: {};
  validationSchema: any[];
  isInitiallyValid?: boolean;
  children: any;
  onSubmit: Function;
}

const Formal = ({
  initialValues,
  validationSchema,
  isInitiallyValid = true,
  children,
  onSubmit,
}: FormProps) => {
  const [formData, setFormData] = React.useState<{
    [key: string]: string;
  }>(initialValues);
  const [shouldValidate, setShouldValidate] = React.useState(!isInitiallyValid);
  const [isValid, setIsValid] = React.useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<any[]>([]);

  const validateForm = React.useCallback(() => {
    let newErrors: any = [];

    validationSchema.forEach((item: { required: boolean; field: string }) => {
      if (item.required && formData[item.field] === "") {
        newErrors.push({
          field: item.field,
          message: "This field is required",
        });
      }
    });

    setErrors(newErrors);
  }, [formData, validationSchema]);

  React.useEffect(() => {
    if (formData && shouldValidate) {
      validateForm();
    }
  }, [formData, validateForm, shouldValidate]);

  React.useEffect(() => {
    setIsValid(errors && !!errors.length ? false : true);
  }, [errors]);

  React.useEffect(() => {
    if (isSubmitting && isValid) {
      onSubmit(formData);
    } else {
      setIsSubmitting(false);
    }
  }, [isSubmitting, isValid, onSubmit, formData]);

  const handleFormSubmit = () => {
    setShouldValidate(true);
    setIsSubmitting(true);
  };

  const onChangeValues = (newValue: {}) => {
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
        isValid,
        errors,
      })}
    </form>
  );
};

export default Formal;
