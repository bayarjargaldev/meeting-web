import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth";
import { useAuthStore } from "../store/authStore";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (import.meta.env.VITE_MOCK_AUTH === "true") {
      navigate("/meetings");
      return;
    }

    const run = async () => {
      const url = new URL(window.location.href);
      const tokenId = url.searchParams.get("tokenid");

      if (!tokenId) {
        setError("Хэрэглэгчийн мэдээлэл ирээгүй!.");
        return;
      }

      try {
        const res = await authApi.verifyToken(tokenId);
        if (res.ok && res.token && res.user) {
          setAuth(res.token, res.user);
          navigate("/meetings");
        } else {
          navigate("/no-permission");
        }
      } catch (e: any) {
        if (e?.response?.status === 403) {
          navigate("/no-permission");
        } else {
          setError("Хэрэглэгчийн мэдээлийг шалгахад алдаа гарлаа.");
        }
      }
    };

    run();
  }, [navigate, setAuth]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin" />
      <p className="mt-4 text-gray-700">
        {error ?? "Хэрэглэгчийн мэдээллийг шалгаж байна..."}
      </p>
      {error && (
        <p className="mt-2 text-xs text-gray-500 text-center px-4">
          Алдаа гарсан тул холбогдох ажилтанд мэдэгдэнэ үү .
        </p>
      )}
    </div>
  );
};

export default AuthPage;
