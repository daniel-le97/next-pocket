import useDarkMode from "../../../hooks/useDarkMode";

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode} className="flex items-center justify-center group">
      {/* {darkTheme ? (
        <BsSun size="24" className="top-navigation-icon" />
      ) : (
        <BsMoon size="24" className="top-navigation-icon" />
      )} */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/3751/3751403.png"
        alt=""
        width={40}
        className="mx-3 cursor-pointer"
      />
      <span className="sidebar-tooltip group-hover:scale-100">
        Toggle Theme
      </span>
    </span>
  );
};

export default ThemeIcon