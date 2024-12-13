export function EmptyState() {
  return(
    <div className="flex flex-col justify-center py-12 items-center">

      <div className="flex justify-center items-center">
        <img className="w-64 h-64"
          src="https://res.cloudinary.com/daqsjyrgg/image/upload/v1690257804/jjqw2hfv0t6karxdeq1s.svg"
          alt="image empty states" />
      </div>
      <h1 className="text-gray-700 font-medium text-2xl text-center mb-3">No CRON jobs</h1>
    </div>
  )
}