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

const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState(false);

  const onCreateForm = () => {
    console.log(userInput)
  }
  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Form</DialogTitle>
            <DialogDescription>
              
              <Textarea className="my-2" placeholder="Write form description.." onChange={(e)=>setUserInput(e.target.value)}/>
              <div className="flex gap-2 my-3 justify-end">
                <Button variant="destructive" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                <Button onClick={onCreateForm}>Create</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
