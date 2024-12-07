"use server";

import { FormErrors } from "@/hooks/useSetErrors";
import { FieldValues } from "react-hook-form";
import { trips } from "@/db/schema/trip";
import { db } from "@/db";
import { captureException, SentryError } from "@sentry/core";

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
    id: number;
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
      .values({
        name: name,
      })
      .returning();

    return {
      success: true,
      data: {
        id: trip.id,
        uuid: trip.uuid,
        redirectUrl: `/dashboard/trips/${trip.uuid}`,
        name,
      },
    };
  } catch (e) {
    captureException(e as SentryError);
    return {
      success: false,
      errors: {
        name: {
          message: "An error occurred while creating the trip",
        },
      },
    };
  }
}
