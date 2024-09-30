import Banner from "../Banner/Banner";
import Plans from "../Plans/Plans";
import Publishers from "../Publishers/Publishers";
import Statistics from "../Statistics/Statistics";
import SubscriptionBanner from "../SubscriptionBanner/SubscriptionBanner";

const Home = () => {
    return (
        <div>
            <SubscriptionBanner></SubscriptionBanner>
            <Banner></Banner>
            <Publishers></Publishers>
            <Statistics></Statistics>
            <Plans></Plans>
        </div>
    );
};

export default Home;