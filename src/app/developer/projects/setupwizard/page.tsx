"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import statesAndCounties from "@/data/us-states-counties.json";
import dynamic from "next/dynamic";

// Dynamically import react-leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const useMapEvents = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMapEvents),
  { ssr: false }
);

// Component for picking a location on the map
function LocationPicker({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? (
    <Marker position={position}>
      <Popup>Selected Location</Popup>
    </Marker>
  ) : null;
}

export default function DeveloperSetupWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1: Project details
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  // Store selected location coordinates (default sample)
  const [location, setLocation] = useState<[number, number]>([41.8781, -87.6298]);

  // Step 2: Invite team members
  const [invitees, setInvitees] = useState<string[]>([]);
  const [inviteInput, setInviteInput] = useState("");

  const stateOptions = Object.keys(statesAndCounties);
  // const countyOptions = state ? statesAndCounties[state] : [];

  const goNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const addInvitee = () => {
    if (inviteInput.trim()) {
      setInvitees((prev) => [...prev, inviteInput.trim()]);
      setInviteInput("");
    }
  };

  const handleFinish = () => {
    // Here, make an API POST request to create the project with all details.
    // For example, using fetch:
    fetch("/api/projects/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        projectName,
        description,
        constructionType: "", // or provide if needed
        startDate,
        location: { lat: location[0], lng: location[1] },
        invitees,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Project creation failed");
        return res.json();
      })
      .then(() => {
        router.push("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to create project");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-6 flex flex-col items-center">
      <div className="mb-8 text-center space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Developer Setup Wizard</h1>
        <p className="text-sm text-gray-600">
          Complete the steps below to set up your project and invite your team.
        </p>
      </div>
      <div className="max-w-3xl w-full bg-white/60 backdrop-blur-md rounded-xl shadow-lg p-6">
        <WizardProgress step={step} />
        {step === 1 && (
          <Card className="mt-6 border-0 bg-transparent shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-bold">Step 1: Project Details</CardTitle>
              <CardDescription className="mt-1 text-gray-500">
                Enter your project’s basic details.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-4 space-y-4">
              <div>
                <Label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  name="projectName"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                  className="mt-1"
                />
              </div>
              {/* <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700">State</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full mt-1">
                        {state || "Select State"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-0">
                      <Command>
                        <CommandInput placeholder="Search state..." />
                        <CommandList>
                          {stateOptions.map((st) => (
                            <CommandItem
                              key={st}
                              onSelect={() => {
                                setState(st);
                                setCounty("");
                              }}
                            >
                              {st}
                            </CommandItem>
                          ))}
                          {stateOptions.length === 0 && <CommandEmpty>No state found</CommandEmpty>}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700">County</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full mt-1" disabled={!state}>
                        {county || (state ? "Select County" : "Select State First")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>County</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {countyOptions.map((c) => (
                        <DropdownMenuItem key={c} onSelect={() => setCounty(c)}>
                          {c}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div> */}
              <div>
                <Label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700">Project Location</Label>
                <div className="h-64 mt-1 rounded-md overflow-hidden">
                  <MapContainer center={location} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationPicker position={location} setPosition={setLocation} />
                  </MapContainer>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Click on the map to select the project location.
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-0 mt-4 flex justify-end">
              <Button variant="default" onClick={goNext}>Next</Button>
            </CardFooter>
          </Card>
        )}
        {step === 2 && (
          <Card className="mt-6 border-0 bg-transparent shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-bold">Step 2: Invite Team Members</CardTitle>
              <CardDescription className="mt-1 text-gray-500">
                Invite other developers, EPCs, or additional team members by entering their email addresses.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-4 space-y-4">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter email to invite"
                  value={inviteInput}
                  onChange={(e) => setInviteInput(e.target.value)}
                  className="flex-1"
                />
                <Button variant="default" onClick={addInvitee}>Add</Button>
              </div>
              {invitees.length > 0 && (
                <div className="space-y-1">
                  {invitees.map((email, index) => (
                    <div key={index} className="text-sm text-gray-700">{email}</div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="p-0 mt-4 flex justify-between">
              <Button variant="outline" onClick={goBack}>Back</Button>
              <Button variant="default" onClick={goNext}>Next</Button>
            </CardFooter>
          </Card>
        )}
        {step === 3 && (
          <Card className="mt-6 border-0 bg-transparent shadow-none text-center">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold">All Done!</CardTitle>
              <CardDescription className="mt-1 text-gray-500">
                Your project setup is complete. Your project has been created and invitations have been sent.
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-0 flex justify-center">
              <Button variant="default" onClick={handleFinish}>Return to Dashboard</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

function WizardProgress({ step }: { step: number }) {
  const steps = ["Project Details", "Invite Team", "Finish"];
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
      {steps.map((label, idx) => {
        const stepNumber = idx + 1;
        const isActive = step === stepNumber;
        const isComplete = step > stepNumber;
        const circleClasses = isComplete
          ? "bg-green-500 text-white"
          : isActive
          ? "bg-blue-500 text-white animate-pulse"
          : "bg-gray-200 text-gray-600";
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none relative">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold transition-all ${circleClasses}`}>
              {isComplete ? "✓" : stepNumber}
            </div>
            <div className="ml-2 text-sm font-medium text-gray-700">{label}</div>
            {idx < steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-gray-200 mx-2 mt-[-1px]" />
            )}
          </div>
        );
      })}
    </div>
  );
}
