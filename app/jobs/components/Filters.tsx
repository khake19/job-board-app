import { IJob } from "../types/job";

interface IJobFiltersProps {
    jobs: IJob[];
    selectedTags: string[];
    onChange: (tags: string[]) => void;
  }
  
const Filters = (props: IJobFiltersProps) => {

}

export default Filters