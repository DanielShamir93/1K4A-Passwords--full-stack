import { FcPlus, FcSearch } from "react-icons/fc";
import { HiMinusCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import CreateAccount from "./components/createAccount/CreateAccount.component";
import Account from "./components/account/Account.component";
import "./home.styles.scss";
import "./home.styles.mobile.scss";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner.component";
import { useNavigate } from "react-router-dom";
import { accountsApi } from "../../api/Apis";


const Home = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterAccounts, setFilterAccounts] = useState("");
  const statesObject = useSelector((state) => {
    return {
      accountChangedRender: state.accountChangedRender,
      loggedInUser: state.loggedInUser,
    };
  });

  useEffect(() => {
    const getAccounts = async () => {
      try {
        setIsLoading(true);

        const config = {
          method: "get",
          headers: { 
            Authorization: `Bearer ${statesObject.loggedInUser.token}` 
          },
        }
        const { data } = await accountsApi(
          "/getAll",
          config
        );

        setAccounts(data.map((account) => ({ ...account })));

      } catch (err) {
        if (err.response.status === 401) {
          // Authentication passed
          navigate('/');
        }
        console.log(err.message);
      }
      setIsLoading(false);
    };
    getAccounts();
  }, [statesObject.accountChangedRender, statesObject.loggedInUser.uid, statesObject.loggedInUser.token, navigate]);

  const toggleCreateAccountComponent = (boolean) => {
    setIsCreateAccountOpen(boolean);
  };

  const renderAccounts = () => {
    return accounts
      .filter((account) =>
        account.accountName.toLowerCase().includes(filterAccounts.toLowerCase())
      )
      .map((account) => {
        return (
          <Account
            key={account._id}
            account={account}
            setIsLoading={setIsLoading}
            toggleCreateAccountComponent={toggleCreateAccountComponent}
          />
        );
      });
  };

  return (
    <div className="Home">
      <div className="home-layout">
        <div className="toolbar">
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
              <FcSearch className="search-account-react-icon"/>
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
