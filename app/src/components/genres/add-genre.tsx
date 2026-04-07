"use client";

import type { Genre } from "@/types/genres.types";
import { useState } from "react";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";

function AddNewGenre({ 
  genres, 
  onSubmit, 
  onClose,
  isSubmitting = false 
}: { 
  genres: Genre[]; 
  onSubmit?: (data: Omit<Genre, "ID">) => void;
  onClose?: () => void;
  isSubmitting?: boolean;
}) {
  const [formData, setFormData] = useState<Omit<Genre, "ID">>({
    name: "",
    descr: "",
    parent_ID: null,
  });

  const handleFileUpload = (file: File | null) => {
    if (!file) return;
    console.log("Uploaded file:", file.name);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      return;
    }
    onSubmit?.(formData);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <Tabs defaultValue="form" className="flex-1 flex flex-col">
        
        {/* Tabs header */}
        <TabsList variant="line" className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Add Genre</TabsTrigger>
          <TabsTrigger value="upload">Upload File</TabsTrigger>
        </TabsList>

        {/* ================= FORM TAB ================= */}
        <TabsContent value="form" className="flex-1 mt-4 md:mt-8 space-y-5">
          
          {/* Name */}
          <div className="space-y-2">
            <Label>Genre Name <span className="text-red-500">*</span> </Label>
            <Input
              className="w-full lg:max-w-full"
              placeholder="Enter genre name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          {/* Parent */}
          <div className="space-y-2">
            <Label>Parent Genre (Optional)</Label>
            <Select
              value={formData.parent_ID?.toString()}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  parent_ID: value ? Number(value) : null,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Parent Genre" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Genres</SelectLabel>
                  {genres.map((g) => (
                    <SelectItem key={g.ID} value={String(g.ID)}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Description (Optional)</Label>
            <Textarea
              className="min-h-25 resize-y"
              placeholder="Enter genre description"
              value={formData.descr ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, descr: e.target.value }))
              }
            />
          </div>
        </TabsContent>

        {/* ================= UPLOAD TAB ================= */}
        <TabsContent value="upload" className="flex-1 mt-4 space-y-5">
          
          <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Upload CSV or Excel file to bulk import genres
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: .csv, .xlsx
            </p>
          </div>

          <div className="space-y-3">
            <Input
              type="file"
              accept=".csv,.xlsx"
              className="cursor-pointer"
              onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
            />
            <Button className="w-full" variant="outline">
              Upload File
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer Buttons  */}
<div className="flex gap-3 pt-6 mt-auto border-t">
        <Button 
          className="flex-1"
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.name.trim()}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        <Button 
          className="flex-1" 
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
      </div>
  );
}

export default AddNewGenre;