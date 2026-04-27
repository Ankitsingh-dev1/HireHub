import React, { useState } from "react";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState(
    JSON.parse(
      localStorage.getItem("savedJobs")
    ) || []
  );

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

  // Remove Job
  const removeJob = (id) => {
    const updatedJobs =
      savedJobs.filter(
        (job) => job.id !== id
      );

    setSavedJobs(updatedJobs);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );
  };

  // Apply Job
  const applyJob = (job) => {
    if (!checkLogin()) return;

    const oldApplied =
      JSON.parse(
        localStorage.getItem(
          "applications"
        )
      ) || [];

    const alreadyApplied =
      oldApplied.find(
        (item) =>
          item.id === job.id
      );

    if (!alreadyApplied) {
      const updatedApplied = [
        ...oldApplied,
        job,
      ];

      localStorage.setItem(
        "applications",
        JSON.stringify(
          updatedApplied
        )
      );

      alert(
        "Application Submitted Successfully 🎉"
      );
    } else {
      alert("Already Applied");
    }
  };

  return (
    <section className="py-14 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold tracking-widest uppercase">
            Bookmarked Jobs
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-4">
            Saved Jobs
          </h1>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
            Keep track of your favorite opportunities and apply anytime.
          </p>
        </div>

        {savedJobs.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">
              📌
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              No Saved Jobs
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Start saving jobs you like and view them here later.
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 font-medium mb-7">
              Total Saved Jobs:{" "}
              {savedJobs.length}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition flex flex-col"
                >
                  <div className="flex justify-between items-start gap-3">
                    <h2 className="text-xl font-bold text-gray-800">
                      {job.title}
                    </h2>

                    <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                      Saved
                    </span>
                  </div>

                  <p className="text-blue-600 font-semibold mt-3">
                    {job.company}
                  </p>

                  <p className="text-gray-500 mt-4 text-sm">
                    📍 {job.location}
                  </p>

                  <p className="text-sm w-fit mt-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {job.job_category}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-auto pt-6">

                    <button
                      onClick={() =>
                        applyJob(job)
                      }
                      className="bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition"
                    >
                      Apply Now
                    </button>

                    <button
                      onClick={() =>
                        removeJob(
                          job.id
                        )
                      }
                      className="border border-red-500 text-red-500 py-3 rounded-2xl hover:bg-red-50 transition"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default SavedJobs;