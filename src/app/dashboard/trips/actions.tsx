"use server";

import { FormErrors } from "@/hooks/useSetErrors";
import { FieldValues } from "react-hook-form";
import { trips } from "@/db/schema/trip";
import { db } from "@/db";

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
    uuid: string;
    name: string;
    redirectUrl: string;
  },
  CreateTripFormValues
>;

export async function createTripAction(
  data: CreateTripFormValues,
): Promise<CreateTripResult> {
  "use server";

  const name = data.name.trim();

  try {
    const [trip] = await db
      .insert(trips)
      // @ts-expect-error - id is required but it is auto-generated
      .values({
        name: name,
      })
      .returning();

    console.log(trip);

    return {
      success: true,
      data: {
        id: "123",
        uuid: "123",
        redirectUrl: `/trip/123`,
        name,
      },
    };
  } catch (e) {
    console.error(e);
  }

  return {
    success: false,
    errors: {
      name: {
        message: "Name already used",
      },
    },
  };
}
