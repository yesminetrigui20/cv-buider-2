import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function GoogleLogin({ onSuccess }) {
  const [status, setStatus] = useState('');

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
      setStatus('Failed to load Google Sign-In. Please check your connection.');
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
      
      window.google.accounts.id.renderButton(
        document.getElementById('googleButtonDiv'),
        { theme: 'outline', size: 'large', width: 250 }
      );
      
      setStatus('Google Sign-In is ready!');
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
      setStatus('Error initializing Google Sign-In. Check console for details.');
    }
  };

  const handleCredentialResponse = (response) => {
    console.log('Token received:', response.credential);
    setStatus('Login successful! Processing...');
    
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
      
      console.log('User Credentials:', credentials);
      if (onSuccess) onSuccess({ token: response.credential, credentials });
      setStatus('User information decoded successfully!');
    } catch (error) {
      console.error('Error decoding token:', error);
      setStatus('Error decoding token. Check console for details.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Connexion avec Google</h3>
      <div id="googleButtonDiv" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}></div>
      {status && (
        <div style={{
          padding: '10px',
          borderRadius: '6px',
          margin: '10px 0',
          fontWeight: '500',
          backgroundColor: status.includes('Error') ? '#fed7d7' : '#c6f6d5',
          color: status.includes('Error') ? '#c53030' : '#2f855a'
        }}>
          {status}
        </div>
      )}
    </div>
  );
}

export default GoogleLogin;