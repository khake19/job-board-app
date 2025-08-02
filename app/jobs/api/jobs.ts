import { IJob } from "../types/job"

export async function fetchJobs(): Promise<IJob[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`)
  if (!res.ok) throw new Error("Failed to fetch jobs")
  return res.json()
}