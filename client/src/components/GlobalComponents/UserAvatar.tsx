const UserAvatar = ({avatarUrl,width,height}:{ avatarUrl: string | undefined, width: string, height: string }) => {
  return (
    <img
      src={avatarUrl}
      alt="User Avatar"
      className={`rounded-full ${width} ${height} object-cover ` }
     
    />
  );
};
export default UserAvatar