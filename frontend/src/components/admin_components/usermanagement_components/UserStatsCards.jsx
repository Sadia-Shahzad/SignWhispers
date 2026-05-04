import BottomStatsCard from "./BottomStatsCard";

const UserStatsCards = ({ totalUsers, totalPremium }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      <BottomStatsCard title="Total Verified Users" value={totalUsers} />

      <BottomStatsCard title="Premium Subscribers" value={totalPremium} />
    </div>
  );
};

export default UserStatsCards;
