"use client"
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./FieldEdit";
import { userResponse } from "@/config/schema";
import moment from "moment";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/config";

const FormUi = ({ jsonForm,onFieldUpdate,deleteField,selectedTheme,editable=true,formId=0}) => {

  const [formData,setFormData] =useState();
  const {toast}=useToast();

  let formRef=useRef();
  const handleInputChange =(event)=>{
    
    const {name,value}=event.target;
    setFormData({
      ...formData,
      [name]:value
    })
  };

  const handleSelectChange =(name,value)=>{
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleCheckboxChange =(fieldName,itemName,value)=>{
    console.log(fieldName,itemName,value);
    const list =formData?.[fieldName]?formData?.[fieldName]:[];
    if(value){
      list.push({
        label:itemName,
        value:value
      });
      setFormData({
        ...formData,
        [fieldName]:list
      })
    }else{
      const res=list.filter((item)=>item.fieldName==itemName);
      setFormData({
        ...formData,
        [fieldName]:res
      })
    }
  }

  const onFormSubmit=async(event)=>{
    event.preventDefault();
    const result=await db.insert(userResponse).
    values({
      jsonResponse:formData,
      createdAt:moment().format('DD/MM/yyyy'),
      formRef:formId
    })

    if(result){
      formRef.reset();
      toast({
        title: "Success",
        description: "Response Sent",
      });
    }
    else{
      toast({
        title: "Failed",
        description: "Error Sending Response",
        variant:destructive
      });
    }
  }
 
  return (
    <form ref={(e)=>formRef=e} onSubmit={onFormSubmit} className="border p-5 md:w-[600px] rounded-lg" data-theme={selectedTheme}>
      <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-500 text-center">
        {jsonForm?.formSubheading}
      </h2>
      {jsonForm?.formFields?.map((field, index) => (
        <div key={index} className="flex justify-center">
          {field.fieldType == "select" ? (
            <div className="w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              <Select className="my-2" required={field?.required} onValueChange={(v)=>handleSelectChange(field.fieldName,v)}>
                <SelectTrigger className="w-full my-4">
                  <SelectValue
                    className="text-gray-500"
                    placeholder={field.placeholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((item, index) => (
                    <SelectItem key={index} value={item} >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType == "radio" ? (
            <div className="w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              <RadioGroup required={field?.required}>
                {field.options.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 w-full"
                  >
                    <RadioGroupItem value={item} id={item} onClick={()=>handleSelectChange(field.fieldName,item)} />
                    <Label htmlFor={item}>{item}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType == "checkbox" ? (
            <div className="w-full my-2">
              <label className="text-sm text-gray-500">{field.label}</label>
              {field?.options ? (
                field.options.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox  onCheckedChange={(v)=>handleCheckboxChange(field.fieldName,item,v)} />
                    <h2>{item}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 w-full">
                  <Checkbox required={field?.required}  />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              <Input
                type={field?.fieldType}
                placeholder={field.placeholder}
                name={field.fieldName}
                required={field?.required}
                onChange={(e)=>handleInputChange(e)}
              />
            </div>
          )}
          {editable&&<div>
            <FieldEdit
              defaultValue={field}
              onUpdate={(value) => {
                onFieldUpdate(value,index);
              }}
              deleteField={()=>deleteField(index)}
            />
          </div>}
          
        </div>
      ))}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default FormUi;
