import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store/modules/types";
import {
  presenceConnect,
  toggleStatus,
} from "../../store/modules/user/actions";
import styles from "./styles.module.scss";

const Home: React.FC = () => {
  const { user } = useSelector((state: ApplicationState) => state);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleStatus());
  };

  useEffect(() => {
    dispatch(presenceConnect());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <code>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </code>

      <button onClick={handleClick}>Change status</button>
      <a href="/" target="_blank">
        Open another tab
      </a>
    </div>
  );
};

export default Home;
