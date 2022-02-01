import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FcPlus, FcSearch } from "react-icons/fc";
import { HiMinusCircle } from "react-icons/hi";
import Account from "./components/account/Account.component";
import CreateAccount from "./components/createAccount/CreateAccount.component";
import Spinner from "../../components/spinner/Spinner.component";
import FollowMe from "./components/followMe/FollowMe.component";
import { ACCOUNTS_END_POINTS_CONSTANTS, HTTP_METHODS_CONSTANTS, } from "../../constants/httpRequests.constants";
import myApi from "../../api/Apis";
import "./home.styles.scss";
import "./home.styles.mobile.scss";

const Home = () => {
  const { GET_ALL_ACCOUNTS_END_POINT } = ACCOUNTS_END_POINTS_CONSTANTS;
  const { GET_METHOD } = HTTP_METHODS_CONSTANTS;
  const [accounts, setAccounts] = useState([]);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterAccounts, setFilterAccounts] = useState("");
  const [isSomeAccountCentered, setIsSomeAccountCentered] = useState(false);
  const { accountChangedRender, loggedInUser } = useSelector((state) => {
    return {
      accountChangedRender: state.accountChangedRender,
      loggedInUser: state.loggedInUser,
    };
  });

  useEffect(() => {
    getAllAccounts();
  }, [accountChangedRender, loggedInUser.uid, loggedInUser.token]);

  const getAllAccounts = async () => {
    setIsLoading(true);
    try {
      const config = {
        method: GET_METHOD,
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      };
      const { data } = await myApi(GET_ALL_ACCOUNTS_END_POINT, config);

      setAccounts(data.map((account) => ({ ...account })));
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  const toggleCreateAccountComponent = (boolean) => {
    setIsCreateAccountOpen(boolean);
  };

  const renderAccounts = () => {
    return accounts
      .filter((account) => account.accountName.toLowerCase().includes(filterAccounts.toLowerCase()))
      .map((account) => {
        return (
          <Account
            key={account._id}
            account={account}
            setIsLoading={setIsLoading}
            toggleCreateAccountComponent={toggleCreateAccountComponent}
            isSomeAccountCentered={isSomeAccountCentered}
            setIsSomeAccountCentered={setIsSomeAccountCentered}
          />
        );
      });
  };

  return (
    <div className="Home">
      <div className="home-layout">
        <div className="left-toolbar">
          {!isLoading && (
            <div>
              {isCreateAccountOpen ? (
                <HiMinusCircle
                  className="create-account-icon"
                  onClick={() => {
                    setIsCreateAccountOpen(!isCreateAccountOpen);
                  }}
                />
              ) : (
                <FcPlus
                  className="create-account-icon"
                  onClick={() => {
                    setIsCreateAccountOpen(!isCreateAccountOpen);
                  }}
                />
              )}
            </div>
          )}
          <div className="follow-me">
            <FollowMe />
          </div>
        </div>
        <div className="accounts-area">
          <div className="accounts-top-toolbar">
            <div className="search-account">
              <input
                className="search-account-input"
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  setFilterAccounts(e.target.value);
                }}
                value={filterAccounts}
              />
              <FcSearch className="search-account-react-icon" />
            </div>
          </div>
          <div className="accounts-gallery">{renderAccounts()}</div>
        </div>
      </div>
      {isCreateAccountOpen && (
        <CreateAccount
          toggleCreateAccountComponent={toggleCreateAccountComponent}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {isLoading && <Spinner />}
    </div>
  );
};

export default Home;
