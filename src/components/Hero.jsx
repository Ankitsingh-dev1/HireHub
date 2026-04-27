import React, { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [resume, setResume] = useState(null);

  // Resume Upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setResume(file.name);
      alert("Resume Uploaded Successfully 🎉");
    }
  };

  return (
    <section className="bg-[#f8f9fa]">
      <div className="max-w-[1150px] mx-auto py-22 grid md:grid-cols-2 gap-12 items-center px-4">

        {/* Left Side */}
        <div>
          <div className="py-2">
            <p className="text-md font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full inline-block shadow-lg">
              #1 <span className="text-xl font-extrabold">HireHub</span>{" "}
              <span className="text-blue-100">
                - Discover Your Next Career Move
              </span>
            </p>

            <h1 className="text-5xl font-bold py-6 leading-tight">
              Get Your{" "}
              <span className="text-blue-600 text-6xl font-bold">
                DREAM <br />JOB
              </span>
              <br /> With Ease
            </h1>

            <p className="text-sm font-semibold md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Discover your dream job, connect with top companies,
              and achieve great things with{" "}
              <span className="text-blue-600">
                HireHub
              </span>.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-5 py-6 px-2">

            <Link to="/jobs">
              <button className="text-white bg-blue-600 py-3 px-7 font-semibold rounded-lg hover:bg-blue-800 shadow-sm">
                Find Jobs
              </button>
            </Link>

            <label className="border border-gray-400 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 shadow-sm cursor-pointer">
              Upload Resume

              <input
                type="file"
                hidden
                onChange={handleResumeUpload}
              />
            </label>

          </div>

          {/* File Name */}
          {resume && (
            <p className="text-green-600 px-2 font-medium">
              Uploaded: {resume}
            </p>
          )}

          {/* Stats */}
          <div className="flex mt-4 gap-6 py-2 px-3">
            <span>
              <h1 className="font-bold text-xl">10K+</h1>
              <p>Jobs Post</p>
            </span>

            <span>
              <h1 className="font-bold text-xl">8K+</h1>
              <p>Companies</p>
            </span>

            <span>
              <h1 className="font-bold text-xl">15K+</h1>
              <p>Candidates</p>
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Hero"
            className="rounded-3xl shadow-xl w-full h-[500px] object-cover"
          />

          <div className="absolute bottom-6 left-6 bg-white p-4 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500">
              Top Hiring Company
            </p>

            <h3 className="font-bold text-lg">
              Google Inc.
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;