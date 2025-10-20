import Banner from '../components/Banner'
import About from '../components/About'
import Location from '../components/Location'
import Promotions from '../components/Promotions'
import TopCourts from './TopCourts'
import ReviewSection from './ReviewSection'
import FAQSection from '../components/Faq'
import Contact from './Contact'

const Home = () => {
    return (
        <div>
            <Banner />
            <About />
            <TopCourts></TopCourts>
            <Location />
            <ReviewSection></ReviewSection>
            <Promotions />
            <FAQSection></FAQSection>
            <Contact></Contact>
        </div>
    )
}

export default Home
