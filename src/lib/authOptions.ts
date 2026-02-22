import { BASE_API_URL, endpoints } from "@/core/api/endpoints";
import { IAuthUser, ICredentialsInput } from "@/interface/dto/auth.dto";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const signInUrlByPassword = `${BASE_API_URL}${endpoints.AUTH.LOGIN_BY_PASSWORD}`;
const signInGoogle = `${BASE_API_URL}${endpoints.AUTH.SIGN_IN_GOOGLE}`;
const refreshTokenUrl = `${BASE_API_URL}${endpoints.AUTH.REFRESH_TOKEN}`;

async function refreshAccessToken(token: { refreshToken: string }) {
  try {
    const response = await fetch(refreshTokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok || refreshedTokens.error) {
      throw new Error("Failed to refresh access token");
    }

    if (!refreshedTokens.access) {
      throw new Error("No access token returned");
    }

    return {
      ...token,
      accessToken: refreshedTokens.access,
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<IAuthUser | null> {
        const { email, password } = credentials as ICredentialsInput;

        try {
          if (!password) throw new Error("Password is required");

          const loginRes = await fetch(signInUrlByPassword, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!loginRes.ok) {
            const msg = await loginRes.text().catch(() => "");
            throw new Error(msg || "Login failed");
          }

          const result = await loginRes.json();

          if (result.status !== "success" || !result.data?.accessToken) {
            throw new Error(result.message || "Login failed");
          }

          const { user } = result.data;

          const accessToken = result.data.accessToken;
          const refreshToken = result.data.refreshToken;

          const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
          const expires_in =
            typeof tokenPayload.exp === "number"
              ? tokenPayload.exp - Math.floor(Date.now() / 1000)
              : 3600;

          return {
            id: user.id,
            name: user.full_name || null,
            email: user.email ?? null,
            image: user.avatar || null,
            accessToken,
            refreshToken,
            expires_in,
            tokenExpiry: Math.floor(Date.now() / 1000) + expires_in,
            profile: {
              phone: user.phone_no ?? null,
              gender: user.gender ?? null,
              country: user.address ?? null,
              dateOfBirth: null,
            },
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),

    CredentialsProvider({
      id: "google-jwt",
      name: "Google (JWT)",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials): Promise<IAuthUser | null> {
        if (!credentials?.token) {
          throw new Error("Token is required");
        }

        try {
          const response = await fetch(signInGoogle, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: credentials.token }),
          }).then((res) => res.json());
          const user = response?.data?.user || response?.user || response;
          const accessToken =
            response?.data?.access_token || response?.access_token;
          const refreshToken =
            response?.data?.refresh_token || response?.refresh_token;

          if (!user || !accessToken) {
            throw new Error(response?.message || "Google login failed");
          }

          let expires_in = 3600;
          try {
            const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
            if (typeof tokenPayload.exp === "number") {
              expires_in = tokenPayload.exp - Math.floor(Date.now() / 1000);
            }
          } catch (err) {
            console.warn("Failed to decode access token", err);
          }

          const name = user.full_name || user.name || null;

          return {
            id: user.id,
            name,
            email: user.email ?? null,
            image: user.avatar || null,
            accessToken,
            refreshToken,
            expires_in,
            tokenExpiry: Math.floor(Date.now() / 1000) + expires_in,
            profile: {
              phone: user.phone_no ?? null,
              gender: user.gender ?? null,
              country: user.address ?? null,
              dateOfBirth: null,
            },
          };
        } catch (error) {
          console.error("Google JWT authentication error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        const u = user as IAuthUser;
        token.id = u.id;
        token.name = u.name;
        token.email = u.email; // will be null
        token.image = u.image;
        token.accessToken = u.accessToken;
        token.refreshToken = u.refreshToken;
        token.tokenExpiry = u.tokenExpiry;
        token.expires_in = u.expires_in;
        token.profile = u.profile;
      }

      if (Date.now() < token.tokenExpiry * 1000) {
        return token;
      }
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email, // null here
          image: token.image,
          profile: token.profile,
        },
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        error: token.error,
      };
    },

    redirect({ url, baseUrl }) {
      const frontendUrl = process.env.NEXT_PUBLIC_BASE_URL ?? baseUrl;
      if (url.startsWith("/")) return `${frontendUrl}${url}`;
      try {
        const parsed = new URL(url);
        if (parsed.origin === frontendUrl) return url;
      } catch {}
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/logout",
  },

  debug: process.env.NODE_ENV === "development",
};
