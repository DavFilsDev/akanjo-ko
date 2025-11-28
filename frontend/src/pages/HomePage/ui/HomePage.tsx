import { Navbar } from "../../../widgets/Navbar";

export function HomePage() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Akanjo-Ko</h1>
        <p>Welcome to the shop !</p>
      </div>
    </>
  );
}
