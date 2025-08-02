import { useMemo } from "react";
import { IJob } from "../types/job";
import MultiSelect from "@/components/MultiSelect";

interface IJobFiltersProps {
    jobs: IJob[];
    selectedTags: string[];
    onChange: (tags: string[]) => void;
  }
  
const Filters = (props: IJobFiltersProps) => {
    const { jobs, selectedTags, onChange } = props;

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

    const options = allTags.map((tag) => ({ label: tag, value: tag }));

    return (
        <div className="mt-12">
          <MultiSelect
            options={options}
            selectedValues={selectedTags}
            onChange={(selectedOptions) => onChange(selectedOptions.map((opt) => opt.value))}
          />
        </div>
      );
}

export default Filters