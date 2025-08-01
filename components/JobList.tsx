import { IJobResponse } from "@/types/job";
import JobCard from "./JobCard";

const JobList = async ({jobs}: {jobs: IJobResponse[]}) => {
    return <div className="px-4 mx-auto lg:w-[80%]">
        {jobs.map((job: IJobResponse) => (
            <JobCard key={job.id} job={job} />
        ))}
    </div>
}

export default JobList;