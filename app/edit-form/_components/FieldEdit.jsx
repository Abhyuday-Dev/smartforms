import { Delete, Edit, Pen, PenIcon, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const FieldEdit = ({ defaultValue, onUpdate,deleteField }) => {
  const [label, setLabel] = useState(defaultValue?.label);
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          <Pen className="w-4 h-4 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Field</h2>
          <div>
            <label className="text-xs">Label Name</label>
            <Input
              type="text"
              defaultValue={defaultValue.label}
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-xs">Placeholder</label>
            <Input
              type="text"
              defaultValue={defaultValue.placeholder}
              onChange={(e) => {
                setPlaceholder(e.target.value);
              }}
            />
          </div>
          <Button
            className="mt-3"
            size="sm"
            onClick={() => {
              onUpdate({ label: label, placeholder: placeholder });
            }}
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger>
          {" "}
          <Trash2 className="w-4 h-4 text-red-500" />
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
            <AlertDialogAction className="bg-red-500 hover:bg-red-700" onClick={deleteField}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FieldEdit;
