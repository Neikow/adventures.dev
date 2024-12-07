"use server";

import { FormErrors } from "@/hooks/useSetErrors";
import { FieldValues } from "react-hook-form";

export interface CreateTripFormValues {
  name: string;
}

export type FormSubmitPayload<TFieldValues extends FieldValues = FieldValues> =
  TFieldValues;

export type FormSubmitResult<
  ReturnData,
  TFieldValues extends FieldValues = FieldValues,
> =
  | {
      success: true;
      data: ReturnData;
    }
  | {
      success: false;
      errors?: FormErrors<TFieldValues>;
    };

export type CreateTripPayload = FormSubmitPayload<CreateTripFormValues>;
export type CreateTripResult = FormSubmitResult<
  {
    id: string;
    name: string;
  },
  CreateTripFormValues
>;

export async function createTripAction(
  data: CreateTripFormValues,
): Promise<CreateTripResult> {
  "use server";

  console.log(data);

  return {
    success: false,
    errors: {
      name: {
        message: "Name already used",
      },
    },
  };
}
