import axios from "axios";
import React, { useEffect, useState } from "react";

const JobCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "https://jsonfakery.com/jobs"
        );

        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Only Job Titles / Categories
  const categoryCount = {};

  data.forEach((job) => {
    const category = job.title;

    categoryCount[category] =
      (categoryCount[category] || 0) + 1;
  });

  // Sort + Slice 0 to 12
  const categories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1150px] mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold tracking-wide">
            Job Categories
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3 text-gray-800">
            Explore Popular Roles
          </h1>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Browse trending job categories like Frontend,
            Backend, React, Java and more.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(([name, count], index) => (
              <div
                key={index}
                onClick={() =>
                  setSelectedCategory({
                    name,
                    count,
                  })
                }
                className="group bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-5 group-hover:bg-blue-600 group-hover:text-white transition">
                  {name.charAt(0)}
                </div>

                <h1 className="text-lg font-bold text-gray-800 group-hover:text-blue-600">
                  {name}
                </h1>

                <p className="text-gray-500 mt-2">
                  {count} Jobs Available
                </p>

                <p className="mt-4 text-sm font-medium text-blue-600">
                  View Details →
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedCategory && (
          <div
            onClick={() =>
              setSelectedCategory(null)
            }
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4"
          >
            <div
              onClick={(e) =>
                e.stopPropagation()
              }
              className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-5">
                {selectedCategory.name.charAt(0)}
              </div>

              <h1 className="text-3xl font-bold text-gray-800">
                {selectedCategory.name}
              </h1>

              <p className="text-lg text-gray-600 mt-3">
                Total Jobs: {selectedCategory.count}
              </p>

              <p className="mt-4 text-gray-500 leading-7">
                Explore companies hiring for{" "}
                {selectedCategory.name} roles and
                apply for latest openings.
              </p>

              <button
                onClick={() =>
                  setSelectedCategory(null)
                }
                className="mt-7 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default JobCategories;