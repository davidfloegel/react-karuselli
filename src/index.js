import React from 'react';
import { render } from "react-dom";

import Demo from './demo';

const App = () => (
  <Demo />
);

render(<App />, document.getElementById("root"));
