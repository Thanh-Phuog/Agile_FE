import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

const SwiperCard = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-6 py-12">
      {/* LEFT: Text section */}
      <div className="flex-1 space-y-6">
        <h2 className="text-5xl font-bold leading-snug text-black">
          Mua Sách Với <span className="text-blue-700">Giá Tốt Nhất</span>
        </h2>
        <p className="text-gray-700 text-lg">
          Khám phá thế giới sách đầy màu sắc từ văn học, kỹ năng sống, đến sách
          thiếu nhi và học thuật. Mỗi cuốn sách là một hành trình khám phá tri thức,
          cảm hứng và đam mê.
        </p>
        <ul className="list-disc ml-6 text-gray-600 text-base space-y-2">
          <li>📚 Hơn 10.000 tựa sách được chọn lọc kỹ lưỡng</li>
          <li>🚚 Giao hàng tận nơi toàn quốc, nhanh chóng</li>
          <li>🎁 Ưu đãi và quà tặng hấp dẫn mỗi tuần</li>
          <li>💬 Hỗ trợ tư vấn chọn sách miễn phí</li>
        </ul>
        <p className="text-blue-700 font-semibold">
          Tìm cuốn sách bạn yêu thích – Hành trình tri thức bắt đầu từ đây!
        </p>
      </div>

      {/* RIGHT: Swiper section */}
      <div className="flex justify-center items-center">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          style={{ width: "280px", height: "350px" }}
        >
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center border-white"
            style={{ backgroundImage: `url('/image/slide1.jpg')` }}
          />
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center border-white"
            style={{ backgroundImage: `url('/image/slide2.jpg')` }}
          />
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center border-white"
            style={{ backgroundImage: `url('/image/slide3.jpg')` }}
          />
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center border-white"
            style={{ backgroundImage: `url('/image/slide4.jpg')` }}
          />
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center border-white"
            style={{ backgroundImage: `url('/image/slide5.jpg')` }}
          />
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center border-white"
            style={{ backgroundImage: `url('/image/slide6.jpg')` }}
          />
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center border-white"
            style={{ backgroundImage: `url('/image/slide7.jpg')` }}
          />
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center border-white"
            style={{ backgroundImage: `url('/image/slide8.jpg')` }}
          />
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperCard;
