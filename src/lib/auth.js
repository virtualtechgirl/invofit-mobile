import { useState, useEffect, createContext, useContext } from 'react';
import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';
import { supabase } from './supabase';

// Ensure web browser redirects are handled
WebBrowser.maybeCompleteAuthSession();

// Auth Context
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Sign in with Apple
  const signInWithApple = async () => {
    try {
      // Generate nonce
      const rawNonce = Crypto.getRandomBytes(16)
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        rawNonce
      );

      // Request Apple auth
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      // Sign in to Supabase with Apple ID token
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
        nonce: rawNonce,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        return { data: null, error: null }; // User cancelled
      }
      console.error('Apple Sign In Error:', error);
      return { data: null, error };
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'invofit://auth/callback',
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;

      // Open browser for Google auth
      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          'invofit://auth/callback'
        );

        if (result.type === 'success' && result.url) {
          // Extract tokens from URL
          const url = new URL(result.url);
          const params = new URLSearchParams(url.hash.substring(1));
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');

          if (accessToken) {
            const { data: sessionData, error: sessionError } =
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });

            if (sessionError) throw sessionError;
            return { data: sessionData, error: null };
          }
        }
      }

      return { data: null, error: null };
    } catch (error) {
      console.error('Google Sign In Error:', error);
      return { data: null, error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Sign Out Error:', error);
      return { error };
    }
  };

  // Get user display info
  const getUserInfo = () => {
    if (!user) return null;

    const metadata = user.user_metadata || {};
    return {
      id: user.id,
      email: user.email,
      name: metadata.full_name || metadata.name || user.email?.split('@')[0],
      avatar: metadata.avatar_url || metadata.picture,
      provider: user.app_metadata?.provider,
    };
  };

  const value = {
    user,
    session,
    loading,
    isSignedIn: !!user,
    signInWithApple,
    signInWithGoogle,
    signOut,
    getUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
