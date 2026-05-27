import { useSelector } from "react-redux";

const PageLoader = () => {
  const loading = useSelector((state) => state.loader.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816]/70 backdrop-blur-sm">
      
      {/* Loader Box */}
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-gray-600 border-t-blue-400 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-white text-sm tracking-wide">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;