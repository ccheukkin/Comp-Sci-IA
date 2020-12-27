import NavBar from "../components/NavBar.js"
import Banner from "../components/Banner.js"
import FeatureBox from "../components/FeatureBox.js"

const Home = () => {
    return(
        <div>
            <NavBar />
            <Banner />
            <div id="jump"></div>
            <FeatureBox
                index={0}
                title="Sort Questions by Topic"
                description="Past paper questions are sorted based on their topics. You can get all the questions that are of the same type."
                name="question"
                link=""
            />
        </div>
    );
}

export default Home;