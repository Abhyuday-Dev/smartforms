import { Input } from "@/components/ui/input";
import React from "react";
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
import { Button } from "@/components/ui/button";

const FormUi = ({ jsonForm,onFieldUpdate,deleteField,selectedTheme}) => {
 
  return (
    <div className="border p-5 md:w-[600px] rounded-lg" data-theme={selectedTheme}>
      <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-500 text-center">
        {jsonForm?.formSubheading}
      </h2>
      {jsonForm?.formFields?.map((field, index) => (
        <div key={index} className="flex justify-center">
          {field.type == "select" ? (
            <div className="w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="text-gray-500"
                    placeholder={field.placeholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.type == "radio" ? (
            <div className="w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              <RadioGroup>
                {field.options.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 w-full"
                  >
                    <RadioGroupItem value={item} id={item} />
                    <Label htmlFor={item}>{item}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.type == "checkbox" ? (
            <div className="w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              {field?.options ? (
                field.options.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox />
                    <h2>{item}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 w-full">
                  <Checkbox />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              <Input
                type={field?.type}
                placeholder={field.placeholder}
                name={field.fieldName}
              />
            </div>
          )}
          <div>
            <FieldEdit
              defaultValue={field}
              onUpdate={(value) => {
                onFieldUpdate(value,index);
              }}
              deleteField={()=>deleteField(index)}
            />
          </div>
          
        </div>
      ))}
      <button className="btn btn-primary">Submit</button>
    </div>
  );
};

export default FormUi;
