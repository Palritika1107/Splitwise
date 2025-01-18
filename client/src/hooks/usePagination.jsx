import { useState, useCallback } from "react";

const usePagination = (fetchExpenses, pageSize) => {
  const [expenses, setExpenses] = useState([]); // All items
  const [page, setPage] = useState(1); // Current page
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Whether more data exists

  // Load items for a specific page
  const loadMore = useCallback(
    async (newPage, isScrollUp = false, previousScrollHeight = 0) => {
      if (loading) return;
      setLoading(true);
      console.log('page scrolled')
      const newExpenses = await fetchExpenses(newPage, pageSize);

      if (isScrollUp) {
        // Scroll-Up: Prepend items
        setExpenses((prevExpenses) => [...newExpenses, ...prevExpenses]);
        setTimeout(() => {
          // Adjust scroll position
          const newScrollHeight = document.documentElement.scrollHeight;
          window.scrollTo(0, newScrollHeight - previousScrollHeight);
        }, 0);
      } else {
        // Scroll-Down: Append items
        setExpenses((prevExpenses) => [...prevExpenses, ...newExpenses]);
        //don't i need to adjust scroll position while scrolling down ?? : DOUBT??????
      }

      setHasMore(newExpenses.length === pageSize); // Check if more items are available
      setPage(newPage); // Update the current page
      setLoading(false);
    },
    [fetchExpenses, pageSize, loading]
  );

  return { expenses, loadMore, loading, hasMore, page };
};

export default usePagination;
