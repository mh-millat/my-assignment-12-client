// const Announcements = () => {
//     const announcements = [
//         { id: 1, title: 'Club will be closed on 14 July' },
//         { id: 2, title: 'New squash court opening soon!' }
//     ]

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">📢 Club Announcements</h2>
//             <ul className="space-y-2">
//                 {announcements.map((a) => (
//                     <li key={a.id} className="bg-white p-4 rounded shadow">
//                         {a.title}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default Announcements


// const announcements = [
//   {
//     id: 1,
//     title: 'Club will be closed on 14 July',
//     date: '2025-07-14',
//     description: 'Please note the club will remain closed on 14th July due to maintenance.'
//   },
//   {
//     id: 2,
//     title: 'New squash court opening soon!',
//     date: '2025-07-20',
//     description: 'Exciting news! Our brand new squash court will be ready to use from 20th July.'
//   }
// ]

// const Announcements = () => {
//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">📢 Club Announcements</h2>
//       <ul className="space-y-4">
//         {announcements.map(({ id, title, date, description }) => (
//           <li
//             key={id}
//             className="bg-white p-5 rounded shadow hover:shadow-md transition-shadow duration-300"
//           >
//             <h3 className="text-lg font-semibold">{title}</h3>
//             <small className="text-gray-500 block mb-2">{new Date(date).toLocaleDateString()}</small>
//             <p className="text-gray-700">{description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default Announcements




const announcements = [
  {
    id: 1,
    title: 'Club will be closed on 14 July',
    date: '2025-07-14',
    description: 'Please note the club will remain closed on 14th July due to maintenance.'
  },
  {
    id: 2,
    title: 'New squash court opening soon!',
    date: '2025-07-20',
    description: 'Exciting news! Our brand new squash court will be ready to use from 20th July.'
  }
]

const Announcements = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📢 Club Announcements</h2>
      <ul className="space-y-4">
        {announcements.map(({ id, title, date, description }) => (
          <li
            key={id}
            className="bg-white p-5 rounded shadow hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold">{title}</h3>
            <small className="text-gray-500 block mb-2">
              {new Date(date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </small>
            <p className="text-gray-700">{description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Announcements
