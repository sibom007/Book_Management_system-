import Navbar from "@/Shared/Navbar";

export default function DashbordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
