import { useState, useEffect, useContext } from "react";
import clsx from "clsx";

import style from "./Home.module.scss";
import Chart from "@/components/Chart";
import { AuthContext } from "@/context/auth/AuthContext";
import { logout } from "@/context/auth/AuthActions";
import * as userService from "@/services/users";
import { LoadingContext } from "@/context/loading/LoadingContext";

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const { setLoading } = useContext(LoadingContext);
  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const res = await userService.getStats();
        setLoading(false);
        setUserStats(res);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading]);

  return (
    <div className={clsx(style.home)}>
      <Chart
        data={userStats}
        title="Number New User Of The Year"
        dataKey="count"
      />
    </div>
  );
};

export default Home;
