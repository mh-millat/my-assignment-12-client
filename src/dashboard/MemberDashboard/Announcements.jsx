import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';

const fetchAnnouncements = async () => {
  const res = await axiosSecure.get('/announcements');
  return res.data;
};

const Announcements = () => {
  const { data: announcements = [], isLoading, isError } = useQuery(
    ['announcements'],
    fetchAnnouncements
  );

  if (isLoading) return <p className="p-4 text-center">Loading announcements...</p>;
  if (isError) return <p className="p-4 text-center text-red-600">Failed to load announcements.</p>;

  if (announcements.length === 0)
    return <p className="p-4 text-center">No announcements available at the moment.</p>;

  return (
    <section className="py-10 px-4 md:px-20 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">📢 Club Announcements</h2>

      <div className="space-y-8">
        {announcements.map(({ _id, title, date, content }) => (
          <article
            key={_id}
            className="bg-white border-l-4 border-blue-600 p-6 rounded shadow-md hover:shadow-lg transition-shadow duration-300"
            aria-labelledby={`announcement-title-${_id}`}
          >
            <h3
              id={`announcement-title-${_id}`}
              className="text-2xl font-semibold mb-3"
            >
              {title}
            </h3>

            <time
              dateTime={date}
              className="text-gray-500 block mb-4"
            >
              📅 {new Date(date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>

            <p className="text-gray-700 leading-relaxed">{content}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Announcements;
