import { Search } from "lucide-react";

export function SearchBar() {
  // <div className="font-sans text-black min-h-screen bg-white flex items-center justify-center">
  return (
    <>
      <form className="w-[50%]  fixed h-auto z-50  m-2 rounded-3xl">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <Search/>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            className="text-white absolute rounded-3xl end-2.5 bottom-2.5 bg-orange-400 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium  text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* <div className="border fixed h-auto z-50 w-auto m-2 rounded-3xl flex">
        <input type="text" className="border-white rounded-3xl px-4 py-2" placeholder="Search..." />
        <button className="flex bg-white items-center border-white justify-center px-4">
          <Search color="#555" />
        </button>
      </div> */}
    </>
  );
}
