import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { TextField } from "./TextField";
import { CheckboxField } from "./CheckboxField";
import { TextareaField } from "./TextareaField";

export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    CheckboxField,
  },
  formComponents: {},
});

export * from "./FormHeader";
export * from "./FormFooter";
