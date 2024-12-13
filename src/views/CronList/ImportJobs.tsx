import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/Dialog";
import { Button } from "../../components/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/Tabs";
import { Textarea } from "../../components/Textarea";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { CronJob } from '../../types/CronJob';

export function ImportJobs({ onImport }: { onImport: (jobs: CronJob[]) => void }) {
	const [open, setOpen] = useState(false);

	const handleJsonImport = (jsonContent: string) => {
		try {
			const jobs = JSON.parse(jsonContent);
			if (Array.isArray(jobs)) {
				onImport(jobs);
				setOpen(false);
			}
		} catch (error) {
			console.error('Invalid JSON format');
		}
	};

	const handleCsvImport = (csvContent: string) => {
    const rows = csvContent.split('\n');
    const jobs = rows.slice(1).map(row => {
        const [id, name, category, description, schedule] = row.split(',');
        return { id, name, category, description, schedule };
    }).filter(job => job.name && job.category && job.schedule);
    onImport(jobs);
    setOpen(false);
	};

	const handleCrontabImport = (crontabContent: string) => {
    const lines = crontabContent.split('\n');
    const jobs = lines
        .filter(line => line.trim() && !line.startsWith('#'))
        .map((line, index) => {
          const parts = line.trim().split(/\s+/);
          const schedule = parts.slice(0, 5).join(' ');
          const description = parts.slice(5).join(' ');
          return {
            id: `${index + 1}`,
            name: `Job ${index + 1}`,
            category: 'Unknown',
            description,
            schedule,
          };
        });
    onImport(jobs);
    setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Upload /> Import Jobs
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
            <DialogTitle>Import CRON Jobs</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="json" className="w-full">
          <TabsList className="grid w-full grid-cols-3 border-b border-slate-100">
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="csv">CSV</TabsTrigger>
            <TabsTrigger value="crontab">Crontab</TabsTrigger>
          </TabsList>
          
          <TabsContent value="json">
            <div className="space-y-4 mt-4">
              <Label>Paste JSON array of CRON jobs</Label>
              <Textarea
                placeholder='[{"id": "1", "name": "job1", "category": "Maintenance", "description": "...", "schedule": "0 * * * *"}]'
                onChange={(e) => handleJsonImport(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="csv">
            <div className="space-y-4 mt-4">
              <Label>Upload CSV file or paste CSV content</Label>
              <Input type="file" accept=".csv" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => handleCsvImport(e.target?.result as string);
                    reader.readAsText(file);
                }
              }} />
              <Textarea
                placeholder="id,name,category,description,schedule"
                onChange={(e) => handleCsvImport(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="crontab">
            <div className="space-y-4 mt-4">
              <Label>Paste crontab content</Label>
              <Textarea
                placeholder="0 * * * * /usr/bin/echo hello"
                onChange={(e) => handleCrontabImport(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
			</DialogContent>
		</Dialog>
	);
}