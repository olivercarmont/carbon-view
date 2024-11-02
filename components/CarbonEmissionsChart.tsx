"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_COMPANY_EMISSIONS, GET_COMPANIES } from "@/graphql/queries";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingDown, TrendingUp } from "lucide-react";

interface Company {
  id: string;
  name: string;
  fullName: string;
}

interface Emission {
  year: number;
  scope1: number;
  scope2: number;
  scope3: number;
}

type ScopeType = 'Scope 1' | 'Scope 2' | 'Scope 3';

const SCOPE_COLORS: Record<ScopeType, string> = {
  'Scope 1': "#0cf0a8",
  'Scope 2': "#E2366F",
  'Scope 3': "#808080"
} as const;

interface CustomizedLabelProps {
  x: number;
  y: number;
  value: number;
  dataKey: keyof typeof SCOPE_COLORS;
  payload: {
    year: number;
    'Scope 1': number;
    'Scope 2': number;
    'Scope 3': number;
  };
}

export function CarbonEmissionsChart() {
  const { data: companiesData, loading: companiesLoading } = useQuery(GET_COMPANIES);
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const { data: emissionsData, loading: emissionsLoading } = useQuery(GET_COMPANY_EMISSIONS, {
    variables: { companyId: selectedCompany },
    skip: !selectedCompany,
  });

  React.useEffect(() => {
    if (companiesData?.companies && !selectedCompany) {
      setSelectedCompany(companiesData.companies[0]?.id);
    }
  }, [companiesData, selectedCompany]);

  const formattedData = useMemo(() => {
    if (!emissionsData?.emissions) return [];

    return emissionsData.emissions.map((emission: Emission) => ({
      year: emission.year,
      'Scope 1': emission.scope1,
      'Scope 2': emission.scope2,
      'Scope 3': emission.scope3,
    }));
  }, [emissionsData]);

  const totalChange = useMemo(() => {
    if (formattedData.length < 2) return 0;
    const firstTotal = formattedData[0]['Scope 1'] + formattedData[0]['Scope 2'] + formattedData[0]['Scope 3'];
    const lastTotal = formattedData[formattedData.length - 1]['Scope 1'] + 
                     formattedData[formattedData.length - 1]['Scope 2'] + 
                     formattedData[formattedData.length - 1]['Scope 3'];
    return ((lastTotal - firstTotal) / firstTotal) * 100;
  }, [formattedData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-black dark:text-white mb-2"><span className="">{label}</span></p>
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex items-center mb-1">
              <div 
                className="w-4 h-4 mr-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <p className="">
                {entry.name}: <span className="font-bold">{entry.value.toFixed(2)} MT</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const sortedLegendItems = useMemo(() => {
    if (!formattedData.length) return [];
    
    const lastDataPoint = formattedData[formattedData.length - 1];
    return (Object.keys(SCOPE_COLORS) as ScopeType[])
      .filter(scope => lastDataPoint[scope] !== undefined)
      .sort((a, b) => lastDataPoint[b] - lastDataPoint[a]);
  }, [formattedData]);

  const CustomizedLabel = (props: CustomizedLabelProps) => {
    const { x, y, value, dataKey, payload } = props;
    if (!payload || payload.year !== 2022) return null;
    
    return (
      <text
        x={x}
        y={y - 10}
        fill={SCOPE_COLORS[dataKey]}
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {`${dataKey}: ${value.toFixed(1)}`}
      </text>
    );
  };

  if (companiesLoading || emissionsLoading) return <div>Loading...</div>;
  if (!companiesData?.companies) return <div>No companies found</div>;

  return (
    <Card className='w-full max-w-[1800px] mx-auto'>
  <CardHeader className='flex flex-col sm:flex-row items-start sm:items-center justify-between border-b p-6 space-y-6 sm:space-y-0'>
    <div>
      <CardTitle className="text-3xl font-bold">
        {companiesData.companies.find((company: Company) => company.id === selectedCompany)?.fullName}
      </CardTitle>
      <CardDescription className="text-base mt-1">
        Scope 1, 2, and 3 emissions over time
      </CardDescription>
    </div>
    <div className="sm:mt-0">
      <div className="text-sm text-muted-foreground mb-3">
        Select Company
      </div>
      <Select 
        value={selectedCompany}
        onValueChange={setSelectedCompany}
      >
            <SelectTrigger className="w-[220px] h-[45px] bg-gray-100 dark:bg-black border-gray-200 dark:border-none focus:ring-0 focus:ring-offset-0 text-gray-900 dark:text-white text-base">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent className="bg-gray-100 dark:bg-black border-gray-200 dark:border-gray-700">
              {companiesData.companies.map((company: Company) => (
                <SelectItem 
                  key={company.id} 
                  value={company.id}
                  className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900 text-base py-2"
                >
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:p-6'>
        <div className='w-full h-[450px] sm:h-[450px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={formattedData}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 10,
              }}>
              <XAxis
                dataKey='year'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickFormatter={(value) => `${value.toFixed(0)} MT`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
  verticalAlign="top" 
  height={36}
  wrapperStyle={{
    paddingBottom: "20px",
    marginTop: "-10px"
  }}
  payload={sortedLegendItems.map((scope: ScopeType) => ({
    value: scope,
    type: 'line',
    color: SCOPE_COLORS[scope],
  }))}
/>
              {formattedData[0]?.['Scope 1'] !== undefined && (
                <Line 
                  type="monotone" 
                  dataKey="Scope 1" 
                  stroke={SCOPE_COLORS['Scope 1']} 
                  dot={false} 
                  strokeWidth={2}
                  label={<CustomizedLabel />}
                />
              )}
              {formattedData[0]?.['Scope 2'] !== undefined && (
                <Line 
                  type="monotone" 
                  dataKey="Scope 2" 
                  stroke={SCOPE_COLORS['Scope 2']} 
                  dot={false} 
                  strokeWidth={2}
                  label={<CustomizedLabel />}
                />
              )}
              {formattedData[0]?.['Scope 3'] !== undefined && (
                <Line 
                  type="monotone" 
                  dataKey="Scope 3" 
                  stroke={SCOPE_COLORS['Scope 3']} 
                  dot={false} 
                  strokeWidth={2}
                  label={<CustomizedLabel />}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      {formattedData.length > 0 && (
        <CardFooter className='flex-col items-start gap-2 text-sm pt-4'>
          <div className='font-medium leading-none'>
            {totalChange > 0 ? (
              <>
                Emissions Increased {" "}
                <span style={{ color: SCOPE_COLORS['Scope 2'] }}>
                  {totalChange.toFixed(2)}%{" "}
                </span>{" "}
                {" "}
                <TrendingUp style={{ color: SCOPE_COLORS['Scope 2'] }} className='inline h-4 w-4' />
              </>
            ) : totalChange < 0 ? (
              <>
                Emissions Decreased {" "}
                <span style={{ color: SCOPE_COLORS['Scope 1'] }}>
                  {Math.abs(totalChange).toFixed(2)}%{" "}
                </span>{" "}
                {" "}
                <TrendingDown style={{ color: SCOPE_COLORS['Scope 1'] }} className='inline h-4 w-4' />
              </>
            ) : (
              <>Emissions unchanged over this period</>
            )}
          </div>
          <div className='leading-none text-muted-foreground'>
            Showing emissions data from {formattedData[0]?.year} to {formattedData[formattedData.length - 1]?.year}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}