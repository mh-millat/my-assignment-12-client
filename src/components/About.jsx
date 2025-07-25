const About = () => {
    return (
        <section className="py-12 px-4 md:px-20 bg-gray-100">
            <h2 className="text-3xl font-bold mb-4 text-center">About Our Club</h2>
            <p className="text-lg leading-7 text-gray-700 text-justify">
                Our sports club was established in 2005 with the mission to promote fitness and community
                through engaging sports activities. We provide top-notch courts, professional trainers, and
                a vibrant community of athletes. Whether you're into tennis, badminton, or squash — we have
                something for everyone.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center font-semibold">
                <p>🎯 Mission: Health, Fitness & Friendship</p>
                <p>🏆 History: 18+ Years of Excellence</p>
            </div>
        </section>
    )
}

export default About
