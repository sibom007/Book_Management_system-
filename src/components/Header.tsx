const Header = ({
  name,
  variant = "primary", // Default to "primary"
}: {
  name: string;
  variant?: "primary" | "secondary"; // Define allowed variants
}) => {
  const variants = {
    primary: "text-3xl leading-tight font-bold text-gray-400",
    secondary: "text-2xl leading-tight font-bold text-gray-400",
  };

  return (
    <div className="flex items-center justify-center my-3">
      <div className="border-b-4 border-yellow-400 rounded-md">
        <h1 className={`${variants[variant]} `}>{name}</h1>
      </div>
    </div>
  );
};

export default Header;
