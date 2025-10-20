// import { useState } from 'react'
// import { motion } from 'framer-motion'

// const coupons = [
//   { code: 'ABC', discount: '5%', desc: 'Get 5% off on your first booking!' },
//   { code: 'SPORT10', discount: '10%', desc: 'Save 10% on any sports court booking!' },
//   { code: 'WINNER15', discount: '15%', desc: 'Exclusive 15% discount for members!' },
//   { code: 'GOAL20', discount: '20%', desc: 'Score big! 20% off sports gear.' },
//   { code: 'FIT5', discount: '5%', desc: 'Stay fit! 5% off gym membership.' },
//   { code: 'RUN15', discount: '15%', desc: 'Run faster! 15% off running shoes.' },
//   { code: 'TEAM10', discount: '10%', desc: 'Team spirit: 10% off group bookings.' },
//   { code: 'PRO25', discount: '25%', desc: 'Pro deals: 25% off premium packages.' },
//   { code: 'MATCH30', discount: '30%', desc: 'Big match! 30% off match tickets.' },
//   { code: 'WIN10', discount: '10%', desc: 'Win more: 10% off competitions.' },
//   { code: 'FAN15', discount: '15%', desc: 'Fan favorite: 15% off merch.' },
//   { code: 'SPORTY5', discount: '5%', desc: 'Stay sporty: 5% off accessories.' },
// ]

// // Motion variants
// const container = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.15 }
//   }
// }

// const cardVariant = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
// }

// const Promotions = () => {
//   const [copied, setCopied] = useState(null)

//   const handleCopy = (code) => {
//     navigator.clipboard.writeText(code)
//     setCopied(code)
//     setTimeout(() => setCopied(null), 2000)
//   }

//   return (
//     <section className="py-16 px-4 md:px-16 bg-gradient-to-b from-blue-50 to-blue-100 mt-10 rounded-2xl shadow-inner">
//       {/* Header */}
//       <motion.div
//         className="text-center mb-12"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">🎁 Exciting Promotions</h2>
//         <p className="text-gray-600 text-base max-w-3xl mx-auto">
//           Use these special coupon codes and enjoy amazing discounts on your next booking!
//         </p>
//       </motion.div>

//       {/* Coupons Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
//         variants={container}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//       >
//         {coupons.map(({ code, discount, desc }) => (
//           <motion.div
//             key={code}
//             className="bg-white p-4 md:p-6 rounded-2xl shadow-md border-t-4 border-blue-600 hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105"
//             variants={cardVariant}
//           >
//             <div className="text-center mb-3">
//               <h3 className="text-xl font-semibold text-blue-700 mb-1">
//                 Code: <span className="text-blue-900">{code}</span>
//               </h3>
//               <p className="text-lg font-semibold text-yellow-500">{discount} OFF</p>
//               <p className="text-gray-600 text-sm mt-1">{desc}</p>
//             </div>

//             <button
//               onClick={() => handleCopy(code)}
//               className={`w-full py-2 mt-3 rounded-full text-white font-medium text-sm shadow-sm transition-all duration-300 ${
//                 copied === code ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-700 hover:bg-blue-800'
//               }`}
//             >
//               {copied === code ? '✅ Copied!' : '📋 Copy Code'}
//             </button>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Footer message */}
//       <motion.div
//         className="text-center mt-12 text-gray-600"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         <p className="text-sm italic">
//           💡 Tip: New coupons are added every month — stay tuned!
//         </p>
//       </motion.div>
//     </section>
//   )
// }

// export default Promotions


import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const coupons = [
  { code: 'ABC', discount: '5%', desc: 'Get 5% off on your first booking!' },
  { code: 'SPORT10', discount: '10%', desc: 'Save 10% on any sports court booking!' },
  { code: 'WINNER15', discount: '15%', desc: 'Exclusive 15% discount for members!' },
  { code: 'GOAL20', discount: '20%', desc: 'Score big! 20% off sports gear.' },
  { code: 'FIT5', discount: '5%', desc: 'Stay fit! 5% off gym membership.' },
  { code: 'RUN15', discount: '15%', desc: 'Run faster! 15% off running shoes.' },
  { code: 'TEAM10', discount: '10%', desc: 'Team spirit: 10% off group bookings.' },
  { code: 'PRO25', discount: '25%', desc: 'Pro deals: 25% off premium packages.' },
  { code: 'MATCH30', discount: '30%', desc: 'Big match! 30% off match tickets.' },
  { code: 'WIN10', discount: '10%', desc: 'Win more: 10% off competitions.' },
  { code: 'FAN15', discount: '15%', desc: 'Fan favorite: 15% off merch.' },
  { code: 'SPORTY5', discount: '5%', desc: 'Stay sporty: 5% off accessories.' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const Promotions = () => {
  const [copied, setCopied] = useState(null)
  const [visibleCount, setVisibleCount] = useState(4)

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, coupons.length))
  }

  return (
    <section className="py-16 px-4 md:px-16 bg-gradient-to-b from-blue-50 to-blue-100 mt-10 rounded-2xl shadow-inner">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">🎁 Exciting Promotions</h2>
        <p className="text-gray-600 text-base max-w-3xl mx-auto">
          Use these special coupon codes and enjoy amazing discounts on your next booking!
        </p>
      </motion.div>

      {/* Coupons Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {coupons.slice(0, visibleCount).map(({ code, discount, desc }) => (
            <motion.div
              key={code}
              className="bg-white p-4 md:p-6 rounded-2xl shadow-md border-t-4 border-blue-600 hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105"
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layout
            >
              <div className="text-center mb-3">
                <h3 className="text-xl font-semibold text-blue-700 mb-1">
                  Code: <span className="text-blue-900">{code}</span>
                </h3>
                <p className="text-lg font-semibold text-yellow-500">{discount} OFF</p>
                <p className="text-gray-600 text-sm mt-1">{desc}</p>
              </div>

              <button
                onClick={() => handleCopy(code)}
                className={`w-full py-2 mt-3 rounded-full text-white font-medium text-sm shadow-sm transition-all duration-300 ${
                  copied === code ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-700 hover:bg-blue-800'
                }`}
              >
                {copied === code ? '✅ Copied!' : '📋 Copy Code'}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* See More Button */}
      {visibleCount < coupons.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleSeeMore}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all"
          >
            See More
          </button>
        </div>
      )}

      {/* Footer message */}
      <motion.div
        className="text-center mt-12 text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-sm italic">
          💡 Tip: New coupons are added every month — stay tuned!
        </p>
      </motion.div>
    </section>
  )
}

export default Promotions
