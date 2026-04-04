import { BookCheck } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Icon */}
      <div className="size-10 rounded-md flex items-center justify-center bg-primary">
        <BookCheck className="text-background w-10 h-6" />
      </div>

      {/* Text */}
      <h2 className="text-xl lg:text-3xl font-extrabold text-primary">
        BookShop
      </h2>
    </div>
  );
};

export default Logo;