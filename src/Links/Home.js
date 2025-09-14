import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Ласкаво просимо до вашого todo-застосунку!</h1>
      <p>
        Цей застосунок допоможе вам організувати ваші щоденні справи. Ви можете
        додавати, редагувати та видаляти завдання, щоб нічого не забути.
      </p>
      <Link to="/todo-list">Розпочати</Link>
    </div>
  );
}

export default Home;
