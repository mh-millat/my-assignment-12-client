import { useState } from 'react'
import Swal from 'sweetalert2'
import useCoupons from '../../hooks/useCoupons'

const Payment = () => {
    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(0)
    const [price] = useState(1000)
    const [isPaid, setIsPaid] = useState(false)

    const { data: coupons = [] } = useCoupons()

    const handleApply = () => {
        const found = coupons.find(c => c.code.toUpperCase() === coupon.toUpperCase())
        if (found) {
            const percent = found.discount
            const discountAmount = price * (percent / 100)
            setDiscount(discountAmount)
            Swal.fire('✅ Coupon Applied!', `You got ${percent}% off!`, 'success')
        } else {
            setDiscount(0)
            Swal.fire('❌ Invalid Coupon', 'Please enter a valid code.', 'error')
        }
    }

    const handlePayment = () => {
        const paymentInfo = {
            email: 'user@example.com',
            court: 'Tennis Court 1',
            date: '2025-07-10',
            slots: 2,
            total: price - discount,
            couponCode: coupon || null
        }

        // Send to backend later
        console.log('✅ Payment Info:', paymentInfo)

        Swal.fire('🎉 Payment Successful', `You paid ৳${paymentInfo.total}`, 'success')
        setIsPaid(true)
    }

    return (
        <section className="max-w-xl mx-auto bg-white p-6 shadow rounded mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">💳 Payment Details</h2>

            <div className="grid gap-4">
                <div>
                    <label className="block text-sm font-medium">Coupon Code:</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter coupon..."
                            className="border px-3 py-2 w-full rounded"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                        />
                        <button
                            onClick={handleApply}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 rounded"
                        >
                            Apply
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Total Price:</label>
                    <input
                        className="border px-3 py-2 w-full rounded font-semibold text-lg text-blue-700"
                        value={`৳ ${price - discount}`}
                        readOnly
                    />
                </div>

                <button
                    onClick={handlePayment}
                    disabled={isPaid}
                    className={`w-full py-3 rounded text-white font-semibold transition ${
                        isPaid ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isPaid ? 'Already Paid' : 'Pay Now'}
                </button>
            </div>
        </section>
    )
}

export default Payment
