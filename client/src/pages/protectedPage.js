import { Link } from "react-router-dom";
const ProtectedPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">protected Page</h1>
      <div className="font-semibold mt-2">
        to see some changes in home page after logging in and to logout go to{" "}
        <Link to="/" className="text-yellow-500">
          home
        </Link>{" "}
      </div>
    </div>
  );
};

export default ProtectedPage;
