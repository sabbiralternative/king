import Banner from "../../components/modules/Home/Banner";
import HomeFooter from "../../components/modules/Home/HomeFooter";
import HomeNavigationBar from "../../components/modules/Home/HomeNavigationBar";
import OddSports from "../../components/modules/Home/OddSports";
import Originals from "../../components/modules/Home/Originals";
import SocialLink from "../../components/modules/Home/SocialLink";
import useBannerImage from "../../hooks/banner.hook";
import { useLotusHomeLobby } from "../../hooks/lotusHomeLobby";

const Home = () => {
  const { data: bannerImage } = useBannerImage();
  const { data: lotusLobby } = useLotusHomeLobby();

  return (
    <div data-v-2f3cedbb>
      <div data-v-5e69ccab data-v-2f3cedbb>
        <div data-v-5e69ccab className="container">
          <HomeNavigationBar />
          {bannerImage?.banner?.length > 0 && (
            <Banner bannerImage={bannerImage?.banner} />
          )}
          <OddSports />
          <Originals trendingGames={lotusLobby?.trendingGames} />
          {/* <CasinoGames /> */}

          <HomeFooter />
        </div>

        <SocialLink />
      </div>
    </div>
  );
};

export default Home;
