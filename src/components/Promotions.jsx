import { useState } from 'react'

const coupons = [
  { code: 'ABC', discount: '5%' },
  { code: 'SPORT10', discount: '10%' },
  { code: 'WINNER15', discount: '15%' }
]

const Promotions = () => {
  const [copied, setCopied] = useState(null)

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section className="py-10 px-4 md:px-20 bg-blue-50">
      <h2 className="text-3xl font-bold mb-6 text-center">🎁 Available Coupons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {coupons.map(({ code, discount }) => (
          <div
            key={code}
            className="bg-white p-6 shadow rounded border-l-4 border-blue-500 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">Code: {code}</h3>
              <p className="text-blue-700 font-bold text-lg">
                Discount: {discount}
              </p>
            </div>
            <button
              onClick={() => handleCopy(code)}
              className={`mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${
                copied === code ? 'bg-green-600' : ''
              }`}
            >
              {copied === code ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Promotions
