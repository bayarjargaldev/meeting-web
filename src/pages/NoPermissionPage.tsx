import React from "react";

const NoPermissionPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6 text-5xl"></div>
        <h1 className="text-2xl font-bold mb-2">Нэвтрэх боломжгүй</h1>

        <p className="text-sm text-gray-500 leading-relaxed">
          Тухайн апп руу хандах эрхгүй байна.
          <br />
          Хэрэв алдаа гарсан гэж үзвэл IT багтай холбогдон уу.
        </p>
      </div>
    </div>
  );
};

export default NoPermissionPage;
