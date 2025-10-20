import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure"; // correct path
import { useState } from "react";
import toast from "react-hot-toast";

const fetchAnnouncements = async () => {
  const res = await axiosSecure.get("/announcements");
  return res.data;
};

const Announcements = () => {
  const { data: announcements = [], isLoading, isError } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });

  if (isLoading) return <p className="p-4">Loading announcements...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load announcements.</p>;

  return (
    <section className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">📢 Club Announcements</h2>
      {announcements.length === 0 ? (
        <p className="text-gray-600">No announcements found.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((ann) => (
            <li
              key={ann._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-600">{ann.title}</h3>
              <p className="text-gray-700 mt-2">{ann.content}</p>
              <small className="text-gray-500 mt-1 block">
                {new Date(ann.date).toLocaleString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Announcements;
