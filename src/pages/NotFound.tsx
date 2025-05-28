
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTexts } from "@/hooks/useTexts";

const NotFound = () => {
  const location = useLocation();
  const texts = useTexts();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{texts.notFound.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{texts.notFound.subtitle}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {texts.notFound.backToHome}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
