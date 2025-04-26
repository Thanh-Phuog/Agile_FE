const ContactScreen = () => {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-10">
        {/* Giới thiệu về cửa hàng sách */}
        <section>
          <h1 className="text-3xl font-bold mb-4 text-blue-600">Về Chúng Tôi</h1>
          <p className="text-gray-700 text-base leading-relaxed">
            Chào mừng bạn đến với <strong>Nhà Sách Tri Thức</strong> – nơi cung cấp hàng ngàn đầu sách chất lượng,
            từ văn học, kỹ năng sống đến sách học thuật. Chúng tôi tin rằng mỗi cuốn sách là một cánh cửa mở ra thế giới tri thức và cảm hứng bất tận.
          </p>
          <p className="text-gray-700 text-base leading-relaxed mt-2">
            Với sứ mệnh lan tỏa văn hóa đọc, chúng tôi không ngừng cập nhật các tựa sách mới nhất và phục vụ khách hàng với sự tận tâm, chuyên nghiệp.
          </p>
        </section>
  
        {/* Thông tin liên hệ */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-blue-600">Liên Hệ</h2>
          <p className="text-gray-700 mb-2">
            Hãy liên hệ với chúng tôi nếu bạn cần hỗ trợ đặt hàng, tư vấn sách hoặc hợp tác phát hành:
          </p>
          <ul className="text-gray-700 space-y-1">
            <li><strong>Địa chỉ:</strong> 184 Lê Đại Hành, Phường 15, Quận 11, TP.HCM</li>
            <li><strong>Email:</strong> hotro@nhasachtrithuc.vn</li>
            <li><strong>Số điện thoại:</strong> 028 1234 5678</li>
          </ul>
        </section>
  
        {/* Form liên hệ */}
        <section>
          <h3 className="text-2xl font-semibold mt-8 mb-4">Gửi tin nhắn cho chúng tôi</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            <textarea 
              placeholder="Nội dung tin nhắn..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Gửi
            </button>
          </form>
        </section>
      </div>
    );
  };
  
  export default ContactScreen;
  