const Test = () => {
  return (
    <div className="flex min-h-screen flex-col items-center">
        <div className="relative flex flex-col items-center">
            <div className="relative w-full">
            <img
              className="w-full object-cover object-center lg:h-48"
              src="main-banner.jpg"
              alt="Main banner"
            />
          </div>
          <h1 className="mt-4 text-2xl font-medium">Title text</h1>
        </div>
        <div className="relative mt-8">
          <h2 className="mb-2 text-lg font-medium">Popular article</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <img
                className="h-32 w-full object-cover object-center"
                src="popular-article.jpg"
                alt="Popular Article"
              />
              <h3 className="mt-2 text-lg font-medium">Popular Article</h3>
              <p className="mt-1 text-gray-700">Some description text</p>
              <div className="mt-2 flex items-center">
                <span className="text-green-500">$19.99</span>
                <a
                  href="#"
                  className="ml-auto text-blue-500 hover:text-blue-800"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mt-8">
          <h2 className="mb-2 text-lg font-medium">All articles</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <img
                className="h-32 w-full object-cover object-center"
                src="all-article.jpg"
                alt="All Article"
              />
              <h3 className="mt-2 text-lg font-medium">All Article</h3>
              <p className="mt-1 text-gray-700">Some description text</p>
              <div className="mt-2 flex items-center">
                <span className="text-green-500">$29.99</span>
                <a
                  href="#"
                  className="ml-auto text-blue-500 hover:text-blue-800"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Test;
