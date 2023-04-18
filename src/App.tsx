import React from 'react';

{
  /*images*/
}
import Logo from './logo.svg';

//const logo = require('./logo.svg') as string;

const App = () => {
  return (
    <div className="container">
      <h1> Template </h1>
      <img src={Logo} alt="Logo" className="inline-block h-20" />
    </div>
  );
};

export default App;
