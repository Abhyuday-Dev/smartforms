import { Button } from "@/components/ui/button";
import { db } from "@/config";
import { userResponse } from "@/config/schema";
import { eq } from "drizzle-orm";
import { DownloadIcon, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const FormCard = ({ form, formRecord }) => {
  const [loading, setLoading] = useState(false);
  const [responseCount, setResponseCount] = useState(0); // State to hold the total number of responses

  const ExportData = async () => {
    let jsonData = [];
    try {
      setLoading(true);
      const response = await db
        .select()
        .from(userResponse)
        .where(eq(userResponse.formRef, formRecord.id));

      if (response) {
        response.forEach((item) => {
          const jsonItem = JSON.parse(item.jsonResponse);
          jsonData.push(jsonItem);
        });

        setLoading(false);
      }
      console.log(jsonData);
      exportToExcel(jsonData);
    } catch (error) {
      console.error("Error fetching form Data:", error);
      toast({
        title: "Error",
        description: "There was an error fetching the form data. Please try again.",
        variant: "destructive", // variant should be a string, not a variable
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = (jsonData) => {
    try {
      // Convert JSON data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(jsonData);
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      // Write the workbook to a file
      XLSX.writeFile(workbook, form?.formTitle + ".xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  // Fetch the response count 
  useEffect(() => {
    const fetchResponseCount = async () => {
      try {
        const response = await db
          .select()
          .from(userResponse)
          .where(eq(userResponse.formRef, formRecord.id));

        if (response) {
          setResponseCount(response.length);
        }
      } catch (error) {
        console.error("Error fetching response count:", error);
      }
    };

    fetchResponseCount(); 
  }, [formRecord.id]); 

  return (
    <div className="border shadow-sm rounded-lg p-4 my-5">
      <h2 className="font-semibold text-lg text-black">{form?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{form?.formSubheading}</h2>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <h2 className="text-sm">
          <strong>{responseCount}</strong> Responses 
        </h2>
        <Button
          size="sm"
          className="flex gap-2 items-center"
          onClick={ExportData}
          disabled={loading}
        >
          <DownloadIcon className="h-4 w-4" />
          {loading ? <Loader2 className="animate-spin" /> : "Export"}
        </Button>
      </div>
    </div>
  );
};

export default FormCard;
