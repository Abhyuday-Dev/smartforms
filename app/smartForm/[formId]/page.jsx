"use client";
import FormUi from "@/app/edit-form/_components/FormUi";
import { db } from "@/config";
import { forms } from "@/config/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const LivePreview = ({ params }) => {
  const [record, setRecord] = useState([]);
  const [jsonForm, setJsonForm] = useState([]);
  useEffect(() => {
    params && getFormData();
  }, [params]);
  
  const getFormData = async () => {
    const result = await db
      .select()
      .from(forms)
      .where(eq(forms.id, Number(params?.formId)));

    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
  };
  return <div className="p-10 flex justify-center items-center" style={{backgroundImage:record?.background}}>
   {record && <FormUi
    jsonForm={jsonForm}
    onFieldUpdate={()=>console.log}
    deleteField={()=>console.log}
    selectedTheme={record?.theme} 
    editable={false}
    formId={record.id}
    />}
  </div>;
};

export default LivePreview;
