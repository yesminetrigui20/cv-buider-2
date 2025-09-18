import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function GoogleLogin({ onSuccess }) {
  const [loginStatus, setLoginStatus] = useState(null); // null, 'success', 'error'

  useEffect(() => {
    // Check if Google script is already loaded
    if (window.google && window.google.accounts) {
      initializeGoogleSignIn();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initializeGoogleSignIn();
    };
    script.onerror = () => {
      console.error('Failed to load Google Sign-In');
      setLoginStatus('error');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeGoogleSignIn = () => {
    try {
      window.google.accounts.id.initialize({
        client_id: '875159789488-mu0m2n8b2925jl11q2os6q27p92v8v3i.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
      
      // Personnalisation du bouton avec style vert
      window.google.accounts.id.renderButton(
        document.getElementById('googleButtonDiv'),
        { 
          theme: 'filled_blue', 
          size: 'large', 
          width: 250,
          text: 'signin_with',
          shape: 'rectangular'
        }
      );
      
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
      setLoginStatus('error');
    }
  };

  const handleCredentialResponse = (response) => {
    try {
      const userInfo = jwtDecode(response.credential);
      const credentials = {
        userId: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        givenName: userInfo.given_name,
        familyName: userInfo.family_name,
        picture: userInfo.picture,
      };
      
      if (onSuccess) onSuccess({ token: response.credential, credentials });
      
      // Afficher le message de succès
      setLoginStatus('success');
      
      // Cacher le message après 5 secondes
      setTimeout(() => {
        setLoginStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error decoding token:', error);
      setLoginStatus('error');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      <div id="googleButtonDiv" style={{ display: 'flex', justifyContent: 'center' }}></div>
      
      {loginStatus === 'success' && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          borderRadius: '6px',
          backgroundColor: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          ✅ Vous êtes connecté avec succès !
        </div>
      )}
      
      {loginStatus === 'error' && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          borderRadius: '6px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          ❌ Erreur de connexion. Veuillez réessayer.
        </div>
      )}
    </div>
  );
}

export default GoogleLogin;