type PropsButton = {
  onClick: () => void;
};

export const ButtonViewAll = ({ onClick }: PropsButton) => {
  return (
    <button className="container__viewAll" onClick={onClick}>
      <h2 className="viewAll">View All</h2>
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M22 10L11.8619 20L10.8923 19.0436L19.3712 10.6801H0V9.31987H19.3712L10.8923 0.956429L11.8619 0L22 10Z"
          fill="white"
        />
      </svg>
    </button>
  );
};
