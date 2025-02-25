// src/app/projects/overview/page.tsx

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Simple Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white shadow-sm">
        <h1 className="text-lg sm:text-xl font-bold">Project Overview</h1>
      </header>

      <Separator />

      <main className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <Card className="border border-gray-200 bg-white rounded-xl shadow-md p-6">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl font-bold mb-2">
                50 MW Solar Farm
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 leading-relaxed">
              {/* Intro / Basic Project Details */}
              <div>
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">48fund (Developer)</span> has
                  invited you to join their project.
                </p>
                <div className="mt-2 text-sm sm:text-base text-gray-600 space-y-1">
                  <p>
                    <strong>Location:</strong> Champaign County, Illinois
                  </p>
                  <p>
                    <strong>Project Start Date:</strong> 4/1
                  </p>
                </div>
              </div>

              {/* Project Image */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-md overflow-hidden shadow">
                <Image
                  src="/solar_panels.webp"
                  alt="Generic Project"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         33vw"
                />
              </div>

              {/* Roles */}
              <div>
                <p className="text-base sm:text-lg font-semibold mb-1">
                  Who else is on this project:
                </p>
                <ul className="ml-5 list-disc space-y-1 text-sm sm:text-base text-gray-700">
                  <li>48fund (Developer - Owner)</li>
                  <li>CKH (Accountant - Confirmed)</li>
                  <li>BTB Energy (EPC - Unconfirmed)</li>
                  <li>Placeholder (Subcontractor 1)</li>
                  <li>Placeholder (Subcontractor 2)</li>
                </ul>
              </div>

              {/* Badges for quick info */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Champaign County</Badge>
                <Badge variant="secondary">Illinois</Badge>
                <Badge variant="secondary">Start: 4/1</Badge>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link href="/epc/projects/setupwizard">
                  <Button
                    variant="default"
                    className="px-6 py-2 font-semibold text-sm sm:text-base"
                  >
                    Join
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
