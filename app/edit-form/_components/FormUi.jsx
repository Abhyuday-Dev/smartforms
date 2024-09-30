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

const FormUi = ({ jsonForm }) => {
  return (
    <div className="border p-5 md:w-[600px] rounded-lg">
      <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-500 text-center">
        {jsonForm?.formSubheading}
      </h2>
      {jsonForm?.formFields?.map((field, index) => (
        <div key={index}>
          {field.type == "select" ? (
            <Select>
              <label className="text-sm text-gray-500">{field.label}</label>
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
          ) : field.type == "radio" ? (
            <div>
              <label className="text-sm text-gray-500">{field.label}</label>
              <RadioGroup>
                {field.options.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={item} id={item} />
                    <Label htmlFor={item}>{item}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.type == "checkbox" ? (
            <div>
              <label className="text-sm text-gray-500">{field.label}</label>
              {field?.options ? (
                field.options.map((item, index) => (
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <h2>{item}</h2>
                  </div>
                ))
              ) : (
                <div flex gap-2>
                  <Checkbox />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3">
              <label className="text-sm text-gray-500">{field.label}</label>
              <Input
                type={field?.type}
                placeholder={field.placeholder}
                name={field.fieldName}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormUi;
