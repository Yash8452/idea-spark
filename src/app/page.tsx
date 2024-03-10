import { Badge } from "./components/Badge";
import { CardContainer } from "./components/CardContainer";
import { SearchBar } from "./components/SearchBar";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <SearchBar />
        <Badge />
        <section className="mt-32">
          <CardContainer />
          {/* <Posts/> */}
        </section>
      </main>
    </>
  );
}
