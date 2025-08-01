import JobList from "@/components/JobList";
import { IJobResponse } from "@/types/job";

export default async function Home() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`)
  const jobs: IJobResponse[] = await data.json()

  return (
      <JobList jobs={jobs} />
  );
}
