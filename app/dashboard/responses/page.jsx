"use client";
import { db } from "@/config";
import { forms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormCard from "./_components/FormCard";

const Responses = () => {
  const { user } = useUser();

  const [formList, setFormList] = useState([]);

  const getFormList = async () => {
    try {
      const response = await db
        .select()
        .from(forms)
        .where(eq(forms.createdBy, user.primaryEmailAddress.emailAddress));

      if (response) {
        setFormList(response);
      }
    } catch (error) {
      console.error("Error fetching form list:", error);
    }
  };

  useEffect(() => {
    user && getFormList();
  }, [user]);
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold flex items-center justify-between">
        Responses
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {formList.map((form, index) => (
          <div key={index}>
            <FormCard form={JSON.parse(form.jsonform)} formRecord={form} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responses;
