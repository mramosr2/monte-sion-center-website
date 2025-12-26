import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-[#0b2a4a]">
      <NavBar />
      {/* Full-width so section backgrounds can span the whole page */}
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}
