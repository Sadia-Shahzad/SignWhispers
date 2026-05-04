const UserManagementHeader = ({ totalUsers }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
      <h1 className="text-2xl font-bold">User Management</h1>

      <span className="text-gray-500 text-sm">
        Total Users:
        <span className="font-bold text-blue-500 ml-1">{totalUsers}</span>
      </span>
    </div>
  );
};

export default UserManagementHeader;
