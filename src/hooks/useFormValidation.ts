import { useState, useCallback } from 'react';
import { z, ZodSchema } from 'zod';

interface ValidationErrors {
  [key: string]: string;
}

interface UseFormValidationReturn<T> {
  data: T;
  errors: ValidationErrors;
  isValid: boolean;
  setData: (data: T) => void;
  setField: (field: keyof T, value: any) => void;
  validate: () => boolean;
  validateField: (field: keyof T) => boolean;
  clearErrors: () => void;
  reset: (initialData: T) => void;
}

export function useFormValidation<T extends Record<string, any>>(
  schema: ZodSchema<T>,
  initialData: T
): UseFormValidationReturn<T> {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = useCallback((): boolean => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [data, schema]);

  const validateField = useCallback(
    (field: keyof T): boolean => {
      try {
        // Validar apenas o campo específico usando o schema completo
        schema.parse(data);

        // Remover erro do campo se existir
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });

        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors.find(
            (err) => err.path.length === 1 && err.path[0] === field
          );

          if (fieldError) {
            setErrors((prev) => ({
              ...prev,
              [field]: fieldError.message,
            }));
          }
        }
        return false;
      }
    },
    [data, schema]
  );

  const setField = useCallback(
    (field: keyof T, value: any) => {
      setData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Validar o campo automaticamente se já tem erro
      if (errors[field as string]) {
        setTimeout(() => validateField(field), 0);
      }
    },
    [errors, validateField]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const reset = useCallback((initialData: T) => {
    setData(initialData);
    setErrors({});
  }, []);

  const isValid = Object.keys(errors).length === 0;

  return {
    data,
    errors,
    isValid,
    setData,
    setField,
    validate,
    validateField,
    clearErrors,
    reset,
  };
}
