import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/Dialog";
import { Button } from "../../components/Button";
import { Textarea } from "../../components/Textarea";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { CronJob } from '../../types/CronJob';

export function EditJobModal({ job, onUpdate, onClose }: { job: CronJob, onUpdate: (job: CronJob) => void, onClose: () => void }) {
	const [formData, setFormData] = useState({
		name: job.name,
		schedule: job.schedule,
		category: job.category,
		description: job.description,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onUpdate({id: job.id, ...formData})
		onClose();
	};
  
	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[525px]">
				<DialogHeader>
					<DialogTitle>Edit Cron Job</DialogTitle>
				</DialogHeader>
				
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							value={formData.name}
							onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="category">Category</Label>
						<Input
							id="category"
							value={formData.category}
							onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="schedule">Schedule (Cron Expression)</Label>
						<Input
							id="schedule"
							value={formData.schedule}
							onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
						/>
					</div>

          <div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							value={formData.description}
							onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
						/>
					</div>

					<div className="flex justify-end space-x-2">
						<Button variant="outline" type="button" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">
							Save Changes
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}