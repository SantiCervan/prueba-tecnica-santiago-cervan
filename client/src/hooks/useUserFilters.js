import { useState, useEffect } from 'react';

export const useUserFilters = (users) => {
  const [searchText, setSearchText] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState(undefined);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const applyFilters = () => {
    let result = [...users];

    if (searchText) {
      result = result.filter(user =>
        (user.name && user.name.toLowerCase().includes(searchText.toLowerCase())) ||
        (user.lastname && user.lastname.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    if (statusFilter && statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(result);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  useEffect(() => {
    applyFilters();
  }, [searchText, statusFilter, users]);

  return {
    searchValue,
    statusFilter,
    filteredUsers,
    handleSearch,
    handleSearchInputChange,
    handleStatusFilterChange
  };
};
