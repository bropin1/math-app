import React, { Fragment } from "react";
import style from "./Home.module.scss";
import Calcul from "../../components/calcul/Calcul";
import Sidebar from "../../components/sidebar/Sidebar";
const Home = () => {
  return (
    <Fragment>
      <div className={style.container}>
        <section className={style.sidebar}>
          <Sidebar />
        </section>
        <section className={style.wrapper}>
          <Calcul />
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
