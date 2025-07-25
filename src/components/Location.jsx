const Location = () => {
    return (
        <section className="py-10 px-4 md:px-20">
            <h2 className="text-3xl font-bold mb-4 text-center">📍 Club Location</h2>
            <p className="text-center mb-4">
                1234 Sports Avenue, Dhaka 1207, Bangladesh
            </p>
            <div className="flex justify-center">
                <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=Dhaka,Bangladesh&zoom=14&size=600x300&key=${import.meta.env.VITE_GOOGLE_MAP_KEY}`}
                    alt="Google Map Location"
                    className="rounded shadow-md max-w-full h-auto"
                />
            </div>
            <div className="text-center mt-4">
                <a
                    href="https://www.google.com/maps/place/Dhaka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                >
                    View on Google Maps
                </a>
            </div>
        </section>
    )
}

export default Location
