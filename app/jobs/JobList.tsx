"use client"
import { IJob } from "./types/job";
import JobCard from "./JobCard";
import { useMemo, useState } from "react";
import Filters from "./components/Filters";

interface IJobListProps {
    jobs: IJob[];   
}

const JobList = (props: IJobListProps) => {
    const { jobs } = props;

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const filteredJobs = useMemo(() => {
        if (selectedTags.length === 0) return jobs;
    
        return jobs.filter((job) => {
          const jobTags = [
            job.role,
            job.level,
            ...(job.languages || []),
            ...(job.tools || []),
          ];
          return selectedTags.every((tag) => jobTags.includes(tag));
        });
      }, [jobs, selectedTags]);

    const handleTagClick = (tag: string) => {
        setSelectedTags((prev) => {
            return prev.includes(tag) ? prev : [...prev, tag];
        });
    };
    
    return <div className="px-4 mx-auto lg:w-[80%] mb-4 pt-6">
        <Filters jobs={jobs} selectedTags={selectedTags} onChange={setSelectedTags}/>
        {filteredJobs.map((job: IJob) => (
            <JobCard key={job.id} job={job} onTagClick={handleTagClick}/>
        ))}
    </div>
}

export default JobList;