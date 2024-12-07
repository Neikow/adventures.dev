"use client";

import { useForm } from "react-hook-form";
import { TextInput } from "@/components/lib/inputs/TextInput";
import { Button } from "@/components/lib/inputs/Button";
import {
  createTripAction,
  CreateTripFormValues,
} from "@/app/dashboard/trips/actions";
import { useSetErrors } from "@/hooks/useSetErrors";
import { useRouter } from "next/navigation";
import { MAX_TRIP_NAME_LENGTH, trips } from "@/db/schema/trip";
import React from "react";

export function TripCreation() {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<CreateTripFormValues>();
  const setErrors = useSetErrors(setError);

  const onValid = React.useCallback(
    async (data: CreateTripFormValues) => {
      const result = await createTripAction(data);
      if (!result.success) {
        setErrors(result.errors);
        return;
      }

      replace(result.data.redirectUrl);
    },
    [replace, setErrors],
  );

  return (
    <form
      className={"flex w-full flex-col items-center justify-center space-y-4"}
      onSubmit={handleSubmit(onValid)}
    >
      <TextInput
        className={"w-full text-center"}
        inputSize={"xl"}
        autoComplete={"off"}
        {...register("name", {
          required: {
            value: true,
            message: "Trip name is required",
          },
          validate: (value) => {
            if (value.length < 3) {
              return "Trip name must be at least 3 characters";
            }
            if (value.length > MAX_TRIP_NAME_LENGTH) {
              return `Trip name must be at most ${MAX_TRIP_NAME_LENGTH} characters`;
            }
            return true;
          },
        })}
        errorText={errors.name?.message}
        placeholder={"Trip name"}
      />

      <Button className={"text-2xl"} disabled={!isValid} type={"submit"}>
        {"Submit >"}
      </Button>
    </form>
  );
}
