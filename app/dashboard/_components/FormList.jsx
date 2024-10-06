"use client";

import { db } from "@/config";
import { forms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormDisplay from "./FormDisplay";

const FormList = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  const getFormList = async () => {
    const response = await db
      .select()
      .from(forms)
      .where(eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(forms.id));

    if(response){
        setFormList(response);
    }

  };

  useEffect(() => {
    user && getFormList();
  }, [user]);
  return <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
    {formList.map((form,index)=>(
        <div key={index}>
            <FormDisplay form={JSON.parse(form.jsonform)} formRecord={form} refreshData={getFormList}/>
        </div>
    ))}
  </div>;
};

export default FormList;
