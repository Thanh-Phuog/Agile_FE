import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

const SwiperBannerCard = () => {
  const bannerImages = ["banner1", "banner2", "banner4", "banner5", "banner6"];
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
  {bannerImages.map((name, index) => (
    <SwiperSlide
      key={index}
      style={{
        height: "500px",
        backgroundImage: `url('/image/${name}.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    />
  ))}
      </Swiper>
    </div>
  );
};


export default SwiperBannerCard;
