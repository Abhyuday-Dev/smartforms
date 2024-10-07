import { Button } from "@/components/ui/button";
import { EditIcon, Share2, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config";
import { and, eq } from "drizzle-orm";
import { forms } from "@/config/schema";
import { useToast } from "@/hooks/use-toast";
import { RWebShare } from "react-web-share";

const FormDisplay = ({ form, formRecord,refreshData}) => {
  const { toast } = useToast();
  const { user } = useUser();

  const onDeleteForm = async () => {
    try {
      const response = await db
        .delete(forms)
        .where(
          and(
            eq(formRecord.id, forms.id),
            eq(forms.createdBy, user.primaryEmailAddress.emailAddress)
          )
        );
  
      if (response) {
        toast({
          title: "Success",
          description: "Form deleted successfully",
        });
        refreshData();
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      toast({
        title: "Error",
        description: "There was an error deleting the form. Please try again.",
      });
    }
  };
  
  return (
    <div className="border shadow-sm rounded-lg p-4">
      <div className="flex justify-between">
        <h2></h2>
        <AlertDialog>
          <AlertDialogTrigger>
            {" "}
            <Trash2 className="w-5 h-5 text-red-500 cursor-pointer hover:scale-105 transition-all" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-700"
                onClick={onDeleteForm}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h2 className="font-semibold text-lg text-black">{form?.formTitle}</h2>
      <h2 className=" text-sm text-gray-500">{form?.formSubheading}</h2>
      <hr className="my-4" />
      <div className="flex justify-between">
      <RWebShare
        data={{
          text: form.formSubheading,
          url:process.env.NEXT_PUBLIC_BASE_URL+"/smartForm/"+formRecord.id,
          title: form?.formTitle,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button variant="outline" size="sm" className="flex gap-2">
          <Share2 className="h-4 w-4" /> Share
        </Button>
      </RWebShare>
        
        <Link href={"/edit-form/" + formRecord.id}>
          <Button size="sm" className="flex gap-2">
            <EditIcon className="h-4 w-4" /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FormDisplay;
