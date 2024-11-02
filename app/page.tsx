"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { CarbonEmissionsChart } from "@/components/CarbonEmissionsChart";
import { ErrorBoundary } from "react-error-boundary";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import GithubIcon from "@/components/icons/GithubIcon";
import { cn } from "@/lib/utils";
import { Kaushan_Script } from 'next/font/google';
import { useState } from 'react';

const kaushanScript = Kaushan_Script({
  weight: '400',
  subsets: ['latin'],
});

const companies = [
  { id: 'AAPL', name: 'Apple', fullName: 'Apple, Inc.' },
  { id: 'GOOGL', name: 'Google', fullName: 'Alphabet, Inc.' },
  { id: 'MSFT', name: 'Microsoft', fullName: 'Microsoft Corporation' },
  { id: 'AMZN', name: 'Amazon', fullName: 'Amazon.com, Inc.' },
  { id: 'META', name: 'Meta', fullName: 'Meta Platforms, Inc.' },
  { id: 'TSLA', name: 'Tesla', fullName: 'Tesla, Inc.' },
  { id: 'NVDA', name: 'NVIDIA', fullName: 'NVIDIA Corporation' },
  { id: 'WMT', name: 'Walmart', fullName: 'Walmart Inc.' },
];

export default function Home() {
  const [showDataInfo, setShowDataInfo] = useState(false);

  return (
    <div className='min-h-screen flex flex-col'>
     <nav className='w-full flex flex-row items-center justify-between px-6 py-3 border-b'>
  <div className={`${kaushanScript.className} text-4xl sm:px-20 sm:ml-20 tracking-tighter`}>
    Carbon View
  </div>
        <div className="flex gap-2">
          <Link
            href={"https://github.com/olivercarmont/kynos"}
            target='_blank'
            rel='noreferrer'>
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "h-[40px] w-[40px] px-0"
              )}>
              <GithubIcon className='h-[1.2rem] w-[1.2rem]' />
              <span className='sr-only'>GitHub</span>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <main className="flex-1 flex items-start sm:items-center justify-center px-4 pt-11 sm:pt-2">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
          <ErrorBoundary fallback={<span>
            Something went wrong while loading the chart
          </span>}>
            <CarbonEmissionsChart />
          </ErrorBoundary>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Understanding Emissions Scopes</CardTitle>
                <CardDescription>Different categories of greenhouse gas emissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#0cf0a8" }}></div>
                    <h3 className="font-semibold">Scope 1</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Direct emissions from owned or controlled sources, such as company vehicles and facilities.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#E2366F" }}></div>
                    <h3 className="font-semibold">Scope 2</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Indirect emissions from purchased electricity, steam, heating, and cooling.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#808080" }}></div>
                    <h3 className="font-semibold">Scope 3</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All other indirect emissions in a company&apos;s value chain, including purchased goods, business travel, and product use.
                  </p>
                </div>

       
  <button
    onClick={() => setShowDataInfo(!showDataInfo)}
    className="text-sm text-muted-foreground hover:text-muted-foreground/80" style={{"borderBottom":"1px solid grey"}}
  >
    How was this data collected?
  </button>
  
  {showDataInfo && (
    <div className="mt-3 text-sm text-muted-foreground space-y-2">
      <p>
        This data was collected from publicly available ESG reports and sustainability disclosures 
        published by each company. The emissions are measured in metric tons of CO2 equivalent (MT) 
        and are reported annually in accordance with the Greenhouse Gas Protocol standards.
      </p>
      <p>Sources:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <a href="https://sustainability.aboutamazon.com/2023-amazon-sustainability-report.pdf" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="underline hover:text-primary">
            Amazon's 2023 Sustainability Report
          </a>
        </li>
        <li>
          <a href="https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="underline hover:text-primary">
            Apple's Environmental Progress Report 2024
          </a>
        </li>
        <li>
          <a href="https://sustainability.fb.com/wp-content/uploads/2023/07/Meta-2023-Sustainability-Report-1.pdf" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="underline hover:text-primary">
            Meta's 2023 Sustainability Report
          </a>
        </li>
        <li>
          <a href="https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RW1lmju" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="underline hover:text-primary">
            Microsoft's Environmental Sustainability Report 2023
          </a>
        </li>
        <li>
          <a href="https://www.ownyourbeliefs.org/securities/GOOGL" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="underline hover:text-primary">
            Google's 2023 Environmental Report
          </a>
        </li>
      </ul>
    </div>
  )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}