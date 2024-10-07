export const debounceInfiniteScroll = ({
  debounceTimeout,
  isFetching,
  setPage,
}: {
  debounceTimeout: React.MutableRefObject<NodeJS.Timeout | null>;
  isFetching: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
  }

  debounceTimeout.current = setTimeout(() => {
    const totalHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;

    if (totalHeight - (scrollTop + windowHeight) <= 100 && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 200);
};
