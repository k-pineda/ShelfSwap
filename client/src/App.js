import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import LoginForm from "./components/Nav/LoginForm";
import SignupForm from "./components/Nav/SignupForm";
import Navbar from "./components/Nav/NavBar";
import Swap from "./pages/Swap";
import Success from "./pages/Success";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import AsideComponent from "./components/SideMenu/Sidemenu";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AsideComponent></AsideComponent>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/chat/:chat_id" element={<Chat />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
