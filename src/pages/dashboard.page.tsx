const DashboardPage = () => {
  return (
    <div className="px-4">
      <h2 className="title">Dashboard</h2>
      <p className="max-w-2xl w-full mb-12 m-auto my-4 text-lg text-gray-500">
        It's a placeholder page for the user's dashboard. It will display the
        user's events and allow them to track the status of their events, orders
        and tickets. The work on this page is not yet started. Go to the events
        page and create your first event! 😉
      </p>

      <div
        className="p-4 w-full rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700"
        role="status"
      >
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
        <div className="mb-10 w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="flex items-baseline mt-4 space-x-6">
          <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-80 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full h-80 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default DashboardPage;
