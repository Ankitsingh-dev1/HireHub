import axios from "axios";
import React, { useEffect, useState } from "react";

const FeaturesJob = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get(
        "https://jsonfakery.com/jobs"
      );

      setJobs(res.data.slice(0, 12));
    };

    fetchJobs();
  }, []);

  // Check Login
  const checkLogin = () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please Login First 🔐");
      return false;
    }

    return true;
  };

  // Apply Job Function
  const applyJob = (job) => {
    if (!checkLogin()) return;

    const oldApplied =
      JSON.parse(
        localStorage.getItem("applications")
      ) || [];

    const alreadyApplied = oldApplied.find(
      (item) => item.id === job.id
    );

    if (!alreadyApplied) {
      const updatedApplied = [
        ...oldApplied,
        job,
      ];

      localStorage.setItem(
        "applications",
        JSON.stringify(updatedApplied)
      );

      alert("Applied Successfully 🎉");
    } else {
      alert("Already Applied");
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1150px] mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold">
            Featured Jobs
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Latest Opportunities
          </h1>
        </div>

        {/* Jobs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-xl flex flex-col h-full"
            >
              <h1 className="text-lg font-bold">
                {job.title}
              </h1>

              <p className="text-gray-600 mt-2">
                {job.company}
              </p>

              <p className="text-gray-500 mt-2">
                📍 {job.location}
              </p>

              <p className="text-gray-500 mt-2">
                💼 {job.employment_type}
              </p>

              <p className="text-blue-600 font-semibold mt-2">
                ₹ {job.salary_from} - ₹ {job.salary_to}
              </p>

              <button
                onClick={() => applyJob(job)}
                className="mt-auto w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesJob;