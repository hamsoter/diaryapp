import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/compat/auth';
import { ChakraProvider, theme } from '@chakra-ui/react';
import MainContainer from '../components/UI/MainContainer';
import Header from '../components/DiaryLists/Header';
import MainContent from '../components/UI/MainContent';
import { useNavigate } from 'react-router-dom';

// firebase
import { ref, set, get } from '@firebase/database';

const Login = ({ fbApp, config, db, setLoginUser }) => {
  // firebase.initializeApp(config);
  const navigate = useNavigate();

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  // 로그인정보
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);

      if (!!user) {
        // db에 유저데이터 저장
        set(ref(db, 'users/' + user.uid), {
          id: user.uid,
          name: user._delegate.displayName,
          email: user._delegate.email,
          indexOn: [],
        });

        navigate('/');
      }
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <ChakraProvider h={'100%'} theme={theme}>
        <MainContainer>
          <Header />
          <MainContent>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </MainContent>
        </MainContainer>
      </ChakraProvider>
    );
  }

  return (
    <div>
      {/* <h1>My App</h1>
      <p>
        Welcome {firebase.auth().currentUser.displayName}! You are now
        signed-in!
      </p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
    </div>
  );
};

export default Login;
