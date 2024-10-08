"use client";
import { React, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/config/AiConfig";
import { db } from "@/config/index";
import { forms } from "@/config/schema";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();


  const onCreateForm = async () => {
    try {
      setLoading(true);

      const result = await chatSession.sendMessage(
        `Description: ${userInput}. Based on this description, please generate a form in JSON format with the following structure: 
        - Form title as "formTitle"
        - Form subheading as "formSubheading"
        - The form should have an array of fields as "formFields", where each field has:
          - "label" (label for the field)
          - "placeholder" (placeholder text)
          - "fieldType" (type of field, e.g., text, radio, checkbox, select)
          - "required" (whether the field is mandatory)
          - For "select" field types, provide an array of options in the following format: [{ value: 'option_value', label: 'Option Label' }]
        Please exclude the submit button from the form.`
      );
      

      if (result.response.text()) {
        console.log(result.response.text());

        const resp = await db
          .insert(forms)
          .values({
            jsonform: result.response.text(),
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: forms.id });

        if (resp[0].id) {
          router.push("/edit-form/" + resp[0].id);
        }
        toast({
          title: "Success",
          description: "Form Created",
        });
      }
    } catch (error) {
      console.error("Error occurred while creating form:", error);
      toast({
        title: "Error",
        description: "Error occured while creating form",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                placeholder="Write form description.."
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button disabled={loading} onClick={onCreateForm}>
                  {loading ? <Loader2 className="animate-spin" /> : "Create"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
