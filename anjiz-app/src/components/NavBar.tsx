import { LogoutButton } from "./LogoutButton";

const NavBar = () => {
  return (
    <div>
      <div className="navbar p-6 w-screen flex items-center justify-between">
        <div className="">
          <div className="flex">
            <img src="logo.png" alt="AnjizLogo" className="w-16 h-16 mr-5" />
            <div>
              <h1 className="text-3xl font-bold">Anjiz</h1>
              <h1 className="text-3xl ">Dashboard</h1>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex justify-start items-center mx-auto btn btn-ghost btn-circle avatar w-48 h-14 pl-2 gap-4 border border-gray-200 rounded-full"
            >
              <div className="w-10 rounded-full">
                <img alt="avatar_User" src="/avatar.png" />
              </div>
              <span>
                <h1>username</h1>
                <p className="text-start text-gray-400">Role</p>
              </span>
            </div>
            <div className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <hr className="border-gray-200 my-3" />
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
