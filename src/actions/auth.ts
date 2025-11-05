"use server";
import { FieldValues } from "react-hook-form";

export const register = async (data: FieldValues) => {
   try {
      console.log("Sending to backend:", data);
      console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });

      console.log("Response status:", res.status);

      const responseData = await res.json();
      console.log("Response data:", responseData);

      if (!res.ok) {
         const errorMessage = responseData.message || `Registration failed with status: ${res.status}`;
         console.error("Backend error:", errorMessage);
         throw new Error(errorMessage);
      }

      return responseData;
   } catch (error: any) {
      console.error("Server action error:", error);

      if (error.name === "TypeError") {
         throw new Error(`Network error: Cannot connect to backend at ${process.env.NEXT_PUBLIC_BACKEND_URL}`);
      }

      throw error;
   }
};
