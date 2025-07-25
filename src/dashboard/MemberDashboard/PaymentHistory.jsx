



import { useState } from 'react'

const paymentData = [
  { id: 'p1', court: 'Tennis Court 1', date: '2025-07-10', slots: 2, total: 800 },
  { id: 'p2', court: 'Badminton Court', date: '2025-07-12', slots: 1, total: 500 },
  { id: 'p3', court: 'Squash Room', date: '2025-07-13', slots: 1, total: 400 },
]

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

const PaymentHistory = () => {
  const [view, setView] = useState('table')

  const toggleView = () => {
    setView((prev) => (prev === 'table' ? 'card' : 'table'))
  }

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">💰 Payment History</h2>
        <button
          onClick={toggleView}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Switch to {view === 'table' ? 'Card' : 'Table'} View
        </button>
      </div>

      {paymentData.length === 0 ? (
        <p className="text-center text-gray-500">No payment records found.</p>
      ) : view === 'table' ? (
        <div className="overflow-x-auto shadow border rounded">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2 border">Court</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Slots</th>
                <th className="px-4 py-2 border">Total (৳)</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map(({ id, court, date, slots, total }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{court}</td>
                  <td className="px-4 py-2 border">{formatDate(date)}</td>
                  <td className="px-4 py-2 border">{slots}</td>
                  <td className="px-4 py-2 border font-semibold">৳ {total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paymentData.map(({ id, court, date, slots, total }) => (
            <div key={id} className="bg-white border shadow p-4 rounded">
              <h3 className="font-bold text-lg mb-1">{court}</h3>
              <p>
                <span className="font-semibold">Date:</span> {formatDate(date)}
              </p>
              <p>
                <span className="font-semibold">Slots:</span> {slots}
              </p>
              <p>
                <span className="font-semibold">Total:</span> ৳ {total}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default PaymentHistory
