
 Project Goal (What You’re Building)
A simple job board app using:

TypeScript

ReactJS / Next.js

Tailwind, SASS, or plain CSS (your choice)

It should display job listings in card format.

Must be responsive (mobile to desktop).

✅ Your Tasks
Build reusable components (e.g., JobCard, JobList, maybe Layout).

Fetch job data from a .json file placed in the public folder (not imported).

Display the jobs using your JobCard component.

Make it responsive — it should look good on all screen sizes.

Style it according to their provided design.

✅ Design File
Check what format it is: Figma, PDF, or images?

Do they provide:

Fonts

Colors

Spacing and layout sizes (e.g., padding, margin)?

If it’s Figma: right-click → Inspect to get exact CSS or Tailwind values.

✅ Fetching Data
They specifically said:

"Place the data file in the public folder and fetch the data rather than importing the JSON file directly."

So use the fetch() API like:

ts
Copy
Edit
useEffect(() => {
  fetch('/jobs.json')
    .then(res => res.json())
    .then(data => setJobs(data));
}, []);
✅ Deliverables
A working app that:

Displays the data

Looks like the design

Works across screen sizes

A ZIP file of the entire project (excluding node_modules).

A README or instructions:

npm install

npm run dev

URL: http://localhost:3000

✅ Evaluation Criteria
Functionality

Code Quality

Responsiveness

Architecture (modular, organized)

Following instructions (e.g., how you fetched data)

❓Things to Check Now:
Do you have access to the design file?

Is there a jobs.json file or similar for data?

Any other folders or special instructions in the package?

Are there mobile + desktop designs?