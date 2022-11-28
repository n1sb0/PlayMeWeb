const Header = () => {
  return (
    <div className="hidden sm:ml-6 sm:block text-center">
      <div className="flex space-x-4">
        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
        <a
          href="/"
          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          aria-current="page"
        >
          Home
        </a>

        <a
          href="/users"
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Users
        </a>
      </div>
    </div>
  );
};

export default Header;
