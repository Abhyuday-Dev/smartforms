import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import themes from "../../_data/Themes";
import gradients from "../../_data/gradientBg";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

const Controller = ({ selectedTheme,selectedBackground }) => {
  const [showMore,setShowMore]=useState(6);
  return (
    <div>
      <h2 className="my-1">Themes</h2>
      <Select
        onValueChange={(value) => {
          selectedTheme(value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme, index) => (
            <SelectItem value={theme.theme} key={index}>
              <div className="flex gap-3">
                <div className="flex">
                  <div
                    className="w-5 h-5 rounded-l-md"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className="w-5 h-5"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                  <div
                    className="w-5 h-5"
                    style={{ backgroundColor: theme.neutral }}
                  ></div>
                  <div
                    className="w-5 h-5 rounded-r-md"
                    style={{ backgroundColor: theme.accent }}
                  ></div>
                </div>
                {theme.theme}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <h2 className="mt-8 my-1">Background</h2>
      <div className="grid grid-cols-3 gap-5">
        {gradients.map((bg, index) =>(index<showMore) &&(
          <div
          key={index}
          onClick={()=>{selectedBackground(bg.gradient)}}
            className="w-full h-[70px] rounded-md hover:border-black hover:border-2 cursor-pointer flex items-center justify-center"
            style={{ background: bg.gradient }}
          >
            {index == 0 && <Ban />}
          </div>
        ))}
        
      </div>
      <Button className="w-full my-3" size="sm" variant="ghost" onClick={()=>setShowMore(showMore>6?6:20)}>{showMore>6?"Show Less":"Show More"}</Button>
    </div>
  );
};

export default Controller;
