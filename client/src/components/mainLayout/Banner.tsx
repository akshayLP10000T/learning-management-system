import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

const Banner = () => {
  const [searchText, setSearchText] = useState<string>("");

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="dark:bg-blue-900 bg-blue-600 py-24 w-full flex justify-center text-white md:px-24 px-5">
      <div className="w-fit flex flex-col justify-center items-center">
        <h2 className="md:text-3xl font-bold text-center text-lg">
          Find courses that suits you and your career
        </h2>
        <h3 className="md:text-xl text-sm text-center">
          Find the courses here and buy to learn with us...
        </h3>
        <form
          onSubmit={(e) => searchHandler(e)}
          className="flex w-full gap-3 items-center md:mt-8 mt-5"
        >
          <Input
            placeholder="Search for best courses"
            className="w-full bg-white text-black"
            value={searchText}
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <Button className="bg-blue-900 dark:bg-blue-500 dark:text-white">
              Search
            </Button>
          )}
        </form>
        <Button
          variant={"outline"}
          className="mt-3 text-black dark:bg-white hover:text-black rounded-full"
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default Banner;
