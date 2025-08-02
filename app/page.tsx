import { fetchJobs } from "./jobs/api/jobs";
import JobList from "./jobs/JobList";

export default async function Home() {
  const jobs = await fetchJobs()
  
  return (
      <JobList jobs={jobs} />
  );
}

