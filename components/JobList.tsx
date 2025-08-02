"use client"
import { IJobResponse } from "@/types/job";
import JobCard from "./JobCard";
import MultiSelect from "./MultiSelect";

const JobList = ({jobs}: {jobs: IJobResponse[]}) => {
    return <div className="px-4 mx-auto lg:w-[80%] mb-4 pt-6">
        <MultiSelect options={[{label: 'Frontend', value:'frontend'}, {label: 'Javascript', value:'javascript'}] } selectedValues={[]} onChange={() => {}}/>
        {jobs.map((job: IJobResponse) => (
            <JobCard key={job.id} job={job} />
        ))}
    </div>
}

export default JobList;