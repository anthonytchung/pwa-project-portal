"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerDemo } from "@/components/ui/datepicker";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";

// Import the full JSON dataset of US states and counties
import statesAndCounties from "@/data/us-states-counties.json";

const NewProjectPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    constructionType: "",
    state: "",
    county: "",
  });

  // Options for the construction type dropdown.
  const constructionTypes = ["Building", "Heavy", "Highway", "Residential"];

  // Extract state names from the imported JSON data.
  const stateOptions = Object.keys(statesAndCounties);

  // County options depend on the selected state.
  const countyOptions = formData.state ? statesAndCounties[formData.state] : [];

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send formData to your API to create a new project
    try {
      const res = await fetch(
        "http://localhost:3000/api/projects/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            projectName: formData.projectName,
            description: formData.description,
            constructionType: formData.constructionType,
            state: formData.state,
            county: formData.county,
          }),
        }
      );
      const data = await res.json()
      if (data.error) {
        setError(data.error); // If there's an error, show it
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
    }

    console.log("Creating project:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Create a New Project
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
              {/* Project Name */}
              <div>
                <Label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  name="projectName"
                  placeholder="Enter the project name"
                  value={formData.projectName}
                  onChange={handleTextChange}
                  required
                  className="mt-1"
                />
              </div>
              {/* Description */}
              <div>
                <Label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter a brief project description"
                  value={formData.description}
                  onChange={handleTextChange}
                  rows={4}
                  required
                  className="mt-1"
                />
              </div>
              {/* Dropdown for Construction Type */}
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Construction Type
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full mt-1">
                      {formData.constructionType || "Select Type"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Construction Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {constructionTypes.map((type) => (
                      <DropdownMenuItem
                        key={type}
                        onSelect={() =>
                          setFormData((prev) => ({
                            ...prev,
                            constructionType: type,
                          }))
                        }
                      >
                        {type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* Inline grouping for State and County */}
              <div className="grid grid-cols-2 gap-4">
                {/* Searchable Dropdown for State */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700">
                    State
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full mt-1">
                        {formData.state || "Select State"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-0">
                      <Command>
                        <CommandInput placeholder="Search state..." />
                        <CommandList>
                          {stateOptions.map((st) => (
                            <CommandItem
                              key={st}
                              onSelect={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  state: st,
                                  county: "", // Reset county when state changes
                                }))
                              }
                            >
                              {st}
                            </CommandItem>
                          ))}
                          {stateOptions.length === 0 && (
                            <CommandEmpty>No state found</CommandEmpty>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                {/* Dropdown for County (dependent on selected state) */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700">
                    County
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full mt-1"
                        disabled={!formData.state}
                      >
                        {formData.county ||
                          (formData.state ? "Select County" : "Select State First")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>County</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {countyOptions.map((county) => (
                        <DropdownMenuItem
                          key={county}
                          onSelect={() =>
                            setFormData((prev) => ({
                              ...prev,
                              county: county,
                            }))
                          }
                        >
                          {county}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Create Project</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewProjectPage;
