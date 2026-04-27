import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const allJobs =
      JSON.parse(localStorage.getItem("jobs")) || [];

    const saved =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    const applied =
      JSON.parse(localStorage.getItem("applications")) || [];

    setJobs(allJobs);
    setSavedJobs(saved);
    setApplications(applied);
  }, []);

  // Remove Application
  const removeApplication = (id) => {
    const updatedApplications =
      applications.filter((job) => job.id !== id);

    setApplications(updatedApplications);

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-md p-8 mb-10 border border-gray-100">
          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Dashboard
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            HireHub Dashboard
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Welcome back! Track jobs, saved jobs and applications.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-7">

          <Link to="/jobs">
            <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition cursor-pointer">
              <p className="text-sm text-gray-500 font-medium">
                Available Jobs
              </p>

              <h2 className="text-4xl font-bold text-blue-600 mt-3">
                {jobs.length}
              </h2>

              <p className="text-gray-400 mt-3">
                Total jobs available
              </p>
            </div>
          </Link>

          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">
              Applications
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">
              {applications.length}
            </h2>

            <p className="text-gray-400 mt-3">
              Total applied jobs
            </p>
          </div>

          <Link to="/saved-jobs">
            <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition cursor-pointer">
              <p className="text-sm text-gray-500 font-medium">
                Saved Jobs
              </p>

              <h2 className="text-4xl font-bold text-purple-600 mt-3">
                {savedJobs.length}
              </h2>

              <p className="text-gray-400 mt-3">
                Total saved jobs
              </p>
            </div>
          </Link>

        </div>

        {/* Applied Jobs */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-7">
            Applied Jobs
          </h2>

          {applications.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-5">
              {applications.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {job.title}
                  </h3>

                  <p className="text-blue-600 mt-2 font-medium">
                    {job.company}
                  </p>

                  <p className="text-gray-500 mt-2">
                    📍 {job.location}
                  </p>

                  <button
                    onClick={() => removeApplication(job.id)}
                    className="mt-5 w-full py-3 rounded-2xl border border-red-500 text-red-500 hover:bg-red-50 transition"
                  >
                    Remove Application
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">
              No Applications Found
            </p>
          )}
        </div>

      </div>
    </section>
  );
};

export default Dashboard;