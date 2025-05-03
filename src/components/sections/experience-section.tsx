import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2 } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  isCurrent?: boolean;
}

const experienceData: ExperienceItem[] = [
  {
    role: "Executive ",
    company: "InsuranceDekho.com", // Replace with actual company or keep generic
    duration: "June 2024 - December 2024", // Replace with actual dates
    description: "Working as an Executive in InsuranceDekho.com Assist clients in selecting suitable insurance plans based on their needs Maintain and update customer records in the company database Track individual and team sales performance using Excel, Power BI, Analyze customer buying patterns to identify trends and improve sales strategies Prepare reports on sales, customer interactions, and policy performance Ensure data accuracy and compliance with company policies and regulations.",
    isCurrent: true,
  },
  {
    role: "Data Analyst Intern",
    company: "Codewave Solutions Pvt Ltd",
    duration: "October 2023 - March 2024", // Replace with actual dates, e.g., "Jan 2023 - Jun 2023"
    description: "Assisted senior analysts in data collection, cleaning, and analysis. Created visualizations and reports using tools like Power BI. Contributed to data-driven projects within an Agile framework.",
  },
  
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="container mx-auto section-padding">
      <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
      <div className="relative pl-6 border-l-2 border-primary/30 space-y-12">
        {/* Timeline line */}
        {/* <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/30"></div> */}

        {experienceData.map((exp, index) => (
          <div key={index} className="relative pl-8">
            {/* Timeline dot */}
            <div className={`absolute left-[-2.10rem] top-1 h-6 w-6 rounded-full flex items-center justify-center ${exp.isCurrent ? 'bg-primary ring-4 ring-primary/20 animate-pulse' : 'bg-muted border-2 border-primary/50'}`}>
               <Briefcase className={`h-3 w-3 ${exp.isCurrent ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
             </div>

            <Card className="glassmorphism hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{exp.role}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>{exp.company}</span>
                    <span className="font-semibold text-primary">{exp.duration}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{exp.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
