// components/JobCard.tsx
import Image from "next/image";


export interface JobCardProps {
  job: {
    id: number;
    company: string;
    logo: string;
    new: boolean;
    featured: boolean;
    position: string;
    role: string;
    level: string;
    postedAt: string;
    contract: string;
    location: string;
    languages: string[];
    tools: string[];
  };
}

export default function JobCard({ job }: JobCardProps) {
  const {
    company,
    logo,
    new: isNew,
    featured,
    position,
    postedAt,
    contract,
    location,
    role,
    level,
    languages,
    tools,
  } = job;

  const tags = [role, level, ...languages, ...tools];

  return (
    <div className={"w-full shadow-md rounded mt-8 p-4 pt-2 bg-white relative lg:flex lg:items-center lg:justify-between lg:p-6" + (featured ? " border-l-4 border-primary" : "")}>
      <div className="absolute top-0 left-4 transform -translate-y-1/2 w-12 h-12 md:w-20 md:h-20 lg:static lg:transform-none lg:w-20 lg:h-20 lg:translate-y-0">
        <Image
          src={logo}
          alt={company}
          width={80}
          height={80}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="mt-8 lg:mt-0 lg:ml-6 lg:flex lg:items-center lg:justify-between lg:flex-1">
        {/* Company info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary font-bold">{company}</span>
            {isNew && (
              <span className="uppercase text-xs bg-primary text-white px-2 py-1 rounded-full">
                New!
              </span>
            )}
            {featured && (
              <span className="uppercase text-xs bg-gray-800 text-white px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>

          <h2 className="font-bold text-lg text-gray-900 hover:text-primary">{position}</h2>
          <div className="text-sm text-gray-500 space-x-2">
            <span>{postedAt}</span>
            <span>•</span>
            <span>{contract}</span>
            <span>•</span>
            <span>{location}</span>
          </div>
        </div>
        
        <hr className="my-4 border-t border-gray-300 lg:hidden" />
        <div className="flex flex-wrap gap-2 mt-4 justify-left lg:mt-0 lg:justify-end">
          {tags.map((tag) => (
            <button
              key={tag}
              className="bg-neutral-100 text-primary font-semibold px-2 py-1 rounded hover:bg-primary hover:text-white transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
