import { Button } from "../../../shared/ui/atoms/Button";
import { Heading } from "../../../shared/ui/atoms/Heading";

export function Navbar() {
  return (
    <nav className="w-full p-4 flex justify-between items-center border-b">
      <Heading level={1}>Akanjo-ko</Heading>
      <Heading level={2} className="text-blue-600">Subheading (simple test)</Heading>
      <Button onClick={() => alert("Login clicked")}>Login</Button>
    </nav>
  );
}
