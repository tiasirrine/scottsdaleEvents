import React from 'react';

const Protected = () => <h3>Welcome, {sessionStorage.userName}</h3>;

export default Protected;
