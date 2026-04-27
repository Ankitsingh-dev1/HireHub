import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const jobsPerPage = 12

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://jsonfakery.com/jobs'
      )

      setJobs(response.data)
    }

    fetchData()
  }, [])

  // Check User Login
  const checkLogin = () => {
    const user = JSON.parse(
      localStorage.getItem('user')
    )

    if (!user) {
      alert('Please Login First 🔐')
      return false
    }

    return true
  }

  // Apply Job
  const applyJob = (job) => {
    if (!checkLogin()) return

    const oldApplied =
      JSON.parse(
        localStorage.getItem('applications')
      ) || []

    const alreadyApplied =
      oldApplied.find(
        (item) => item.id === job.id
      )

    if (!alreadyApplied) {
      const updatedApplied = [
        ...oldApplied,
        job,
      ]

      localStorage.setItem(
        'applications',
        JSON.stringify(updatedApplied)
      )

      alert(
        'Application Submitted Successfully 🎉'
      )
    } else {
      alert('Already Applied')
    }
  }

  // Save Job
  const saveJob = (job) => {
    if (!checkLogin()) return

    const oldJobs =
      JSON.parse(
        localStorage.getItem('savedJobs')
      ) || []

    const alreadySaved =
      oldJobs.find(
        (item) => item.id === job.id
      )

    if (!alreadySaved) {
      const updatedJobs = [
        ...oldJobs,
        job,
      ]

      localStorage.setItem(
        'savedJobs',
        JSON.stringify(updatedJobs)
      )

      alert('Job Saved Successfully 🎉')
    } else {
      alert('Job Already Saved')
    }
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      job.job_category
        .toLowerCase()
        .includes(category.toLowerCase()) &&
      job.location
        .toLowerCase()
        .includes(location.toLowerCase())
  )

  const totalPages = Math.ceil(
    filteredJobs.length / jobsPerPage
  )

  const startIndex =
    (currentPage - 1) * jobsPerPage

  const endIndex =
    startIndex + jobsPerPage

  const currentJobs =
    filteredJobs.slice(
      startIndex,
      endIndex
    )

  const changePage = (page) => {
    setCurrentPage(page)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-14 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold tracking-widest uppercase">
            Career Opportunities
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-4">
            Find Your Dream Job
          </h1>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
            Explore premium openings from trusted companies and apply today.
          </p>
        </div>

        {/* Top */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500 font-medium">
            Showing {currentJobs.length} of {filteredJobs.length} Jobs
          </p>

          <Link
            to="/saved-jobs"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
          >
            Saved Jobs
          </Link>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-12 bg-white p-5 rounded-3xl shadow-md">

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="border rounded-2xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value)
              setCurrentPage(1)
            }}
            className="border rounded-2xl px-4 py-3"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setCurrentPage(1)
            }}
            className="border rounded-2xl px-4 py-3"
          >
            <option value="">
              All Categories
            </option>

            {[...new Set(
              jobs.map(
                (job) =>
                  job.job_category
              )
            )].map(
              (item, index) => (
                <option
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

        </div>

        {/* Jobs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-3xl shadow-sm flex flex-col"
            >
              <h2 className="text-xl font-bold">
                {job.title}
              </h2>

              <p className="text-blue-600 mt-2">
                {job.company}
              </p>

              <p className="text-gray-500 mt-3">
                📍 {job.location}
              </p>

              <p className="mt-3 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full w-fit">
                {job.job_category}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-auto pt-6">

                <button
                  onClick={() =>
                    applyJob(job)
                  }
                  className="bg-blue-600 text-white py-3 rounded-2xl"
                >
                  Apply Now
                </button>

                <button
                  onClick={() =>
                    saveJob(job)
                  }
                  className="border border-blue-600 text-blue-600 py-3 rounded-2xl"
                >
                  Save
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Jobs