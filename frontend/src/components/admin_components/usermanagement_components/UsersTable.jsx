import UserRow from "./UserRow";

const UsersTable = ({ users = [], toggleAdmin }) => {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 w-full">
      {/* scroll container */}
      <div className="w-full  overflow-x-auto">
        <table className="w-full min-w-80 text-xs sm:text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-gray-600">
              <th className="px-3 sm:px-6 py-3 text-left font-medium ">
                User Details
              </th>

              <th className="px-3 sm:px-6 py-3 text-left font-medium ">Role</th>

              <th className="px-3 sm:px-4 py-3 text-left font-medium ">
                Premium Status
              </th>

              <th className="px-3 sm:px-4 py-3 text-left font-medium ">
                Payments
              </th>

              <th className="px-3 sm:px-4 py-3 text-left font-medium ">
                Admin Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 ">
            {users.map((user) => (
              <UserRow key={user.id} user={user} toggleAdmin={toggleAdmin} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
