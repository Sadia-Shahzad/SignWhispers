import Pagination from "./Pagination";

const UsersTableFooter = ({
  currentPage,
  usersPerPage,
  filteredUsers,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
      <p className="text-gray-600 text-sm">
        Showing
        <span className="font-semibold mx-1">
          {Math.min(currentPage * usersPerPage, filteredUsers.length)}
        </span>
        out of
        <span className="font-semibold ml-1">{filteredUsers.length}</span>
        users
      </p>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UsersTableFooter;
