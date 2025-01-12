import { useState, useMemo } from 'react';

function useFilter(todos) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus = 
        filterStatus === 'all' || 
        (filterStatus === 'completed' && todo.completed) ||
        (filterStatus === 'active' && !todo.completed);
      
      const matchesSearch = 
        todo.text.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [todos, filterStatus, searchTerm]);

  return {
    filteredTodos,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm
  };
}

export default useFilter;