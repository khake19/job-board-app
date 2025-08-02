"use client"
import { IJob } from "./types/job";
import JobCard from "./JobCard";
import MultiSelect from "@/components/MultiSelect";
import { useMemo, useState } from "react";

interface IJobListProps {
    jobs: IJob[];   
}

const JobList = (props: IJobListProps) => {
    const { jobs } = props;

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Extract all unique tags from job list
    const allTags = useMemo(() => {
        return Array.from(
        new Set(
            jobs.flatMap((job) => [
            job.role,
            job.level,
            ...(job.languages || []),
            ...(job.tools || []),
            ])
        )
        );
    }, [jobs]);
    
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
        <div className="mt-12">
            <MultiSelect 
            options={allTags.map(tag => ({ label: tag, value: tag })) }
             selectedValues={selectedTags.map((tag) => (tag))}
             onChange={(selectedOptions) => {
                setSelectedTags(selectedOptions.map((opt) => opt.value));
            }}
            />
        </div>
        {filteredJobs.map((job: IJob) => (
            <JobCard key={job.id} job={job} onTagClick={handleTagClick}/>
        ))}
    </div>
}

export default JobList;