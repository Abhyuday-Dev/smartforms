"use client";

import { db } from "@/config";
import { forms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUi from "../_components/FormUi";

const EditForm = ({ params }) => {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);

  useEffect(() => {
    user && getFormData();
  }, [user]);

  const getFormData = async () => {
    const result = await db
      .select()
      .from(forms)
      .where(
        and(
          eq(forms.id, params?.formId),
          eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateDbForm();
    }
  }, [updateTrigger]);
  const onFieldUpdate = (value, index) => {
    jsonForm.formFields[index].label = value.label;
    jsonForm.formFields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };


  const updateDbForm = async () => {
    try {
      const result = await db
        .update(forms)
        .set({ jsonform: jsonForm })
        .where(
          and(
            eq(forms.id, record.id),
            eq(user?.primaryEmailAddress?.emailAddress, forms.createdBy)
          )
        );
        console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteField=(indexToRemove)=>{
    const result=jsonForm.formFields.filter((item,index)=>index!=indexToRemove);
    jsonForm.formFields=result;
    setUpdateTrigger(Date.now());
  }
  return (
    <div className="p-10">
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
        onClick={() => router.back()}
      >
        <ArrowLeft />
        Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">Controller</div>
        <div className="md:col-span-2 border rounded-lg h-full flex items-center justify-center p-5">
          <FormUi jsonForm={jsonForm} onFieldUpdate={onFieldUpdate} deleteField={(index)=>deleteField(index)} />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
