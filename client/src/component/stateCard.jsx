 const StatCard = ({ icon: Icon, title, value, bgColor }) => (
    <div className={`${bgColor} rounded-xl p-6 text-white h-45 flex items-center shadow-lg`}>
      <div className="flex justify-between w-full">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value.toLocaleString()}</p>
        </div>
        <Icon className="h-12 w-12 text-white/60" />
      </div>
    </div>
  );
  export default StatCard