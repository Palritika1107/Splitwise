import { useState, useCallback } from "react";

const usePagination = (fetchExpenses, pageSize, setMainExpenses) => {
  const [loadedPages, setLoadedPages] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // Current page

  const loadMore = useCallback(
    async (newPage, isScrollUp = false, previousScrollHeight = 0) => {
      if (loading || loadedPages.has(newPage)) return; // Prevent duplicate calls
      setLoading(true);

      try {
        const newExpenses = await fetchExpenses(newPage, pageSize);

        setMainExpenses((prev) => {
          const prevIds = new Set(prev.map((expense) => expense._id));
          const uniqueNewExpenses = newExpenses.filter(
            (expense) => !prevIds.has(expense._id)
          );

          return isScrollUp
            ? [...uniqueNewExpenses, ...prev]
            : [...prev, ...uniqueNewExpenses];
        });

        setLoadedPages((prev) => new Set(prev).add(newPage));
        setHasMore(newExpenses.length === pageSize);
        setPage(newPage);
      } catch (error) {
        console.error("Error loading more expenses:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchExpenses, pageSize, loading, loadedPages, setMainExpenses]
  );

  return { loadMore, loading, hasMore ,page};
};

export default usePagination;
