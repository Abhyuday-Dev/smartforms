"use client";

import { db } from "@/config";
import { forms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUi from "../_components/FormUi";
import Controller from "../_components/Controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RWebShare } from "react-web-share";

const EditForm = ({ params }) => {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);

  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBackground, setSelectedBackground] = useState();

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
    setSelectedBackground(result[0].background);
    setSelectedTheme(result[0].theme);
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

  const deleteField = (indexToRemove) => {
    const result = jsonForm.formFields.filter(
      (item, index) => index != indexToRemove
    );
    jsonForm.formFields = result;
    setUpdateTrigger(Date.now());
  };

  const updateFields = async (value, columnName) => {
    const result = await db
      .update(forms)
      .set({ [columnName]: value })
      .where(
        and(
          eq(forms.id, record.id),
          eq(user?.primaryEmailAddress?.emailAddress, forms.createdBy)
        )
      );
  };
  return (
    <div className="p-10">
    <div className="flex justify-between items-center">
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
        onClick={() => router.back()}
      >
        <ArrowLeft />
        Back
      </h2>
      <div className="flex gap-2">
        <Link href={"/smartForm/"+record?.id} target="_blank">
        <Button className="flex gap-2"><SquareArrowOutUpRight className="w-4 h-4" /> Live Preview</Button>
        </Link>
       
        <RWebShare
        data={{
          text: jsonForm.formSubheading,
          url:process.env.NEXT_PUBLIC_BASE_URL+"smartForm/"+record.id,
          title: jsonForm?.formTitle,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button  className="flex gap-2 bg-green-600 hover:bg-green-700 cursor-pointer">
          <Share2 className="h-4 w-4" /> Share
        </Button>
      </RWebShare>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller
            selectedTheme={(value) => {
              updateFields(value, "theme");
              setSelectedTheme(value);
            }}
            selectedBackground={(value) => {
              updateFields(value, "background");
              setSelectedBackground(value);
            }}
          />
        </div>
        <div
          className="md:col-span-2 border rounded-lg h-full flex items-center justify-center p-5"
          style={{ backgroundImage: selectedBackground }}
        >
          <FormUi
            jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index) => deleteField(index)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
