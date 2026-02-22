"use client";

import { signIn } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
  clientId?: string;
}

interface GoogleAccountsId {
  initialize: (options: {
    client_id: string;
    callback: (res: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
    use_fedcm_for_prompt?: boolean;
  }) => void;
  renderButton: (
    element: HTMLElement | null,
    options: {
      theme: string;
      size: string;
      text: string;
      shape: string;
      width?: string;
      locale?: string;
    }
  ) => void;
  cancel?: () => void;
  prompt?: (notification?: unknown) => void;
  disableAutoSelect?: () => void;
}

interface GoogleWindow extends Window {
  google?: {
    accounts: {
      id: GoogleAccountsId;
    };
  };
}

// Global variables to prevent any Google Sign-In interference
let googleInitFlag = false;
let buttonRenderCount = 0;
const MAX_RENDER_ATTEMPTS = 3;

// Global function to force English language on any Google elements
const forceEnglishOnGoogleElements = () => {
  // Force language on any Google iframe elements
  const googleIframes = document.querySelectorAll(
    'iframe[src*="accounts.google.com"]'
  );
  googleIframes.forEach((iframe: Element) => {
    const htmlIframe = iframe as HTMLIFrameElement;
    if (htmlIframe.src && !htmlIframe.src.includes("hl=en")) {
      const url = new URL(htmlIframe.src);
      url.searchParams.set("hl", "en");
      htmlIframe.src = url.toString();
    }
  });
};

const GoogleLoginButton = ({
  isOpen,
  onSuccess,
}: {
  isOpen: boolean;
  onSuccess?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = useCallback(
    async (res: GoogleCredentialResponse) => {
      setIsLoading(true);

      try {
        const result = await signIn("google-jwt", {
          redirect: false,
          token: res.credential,
        });

        if (result?.ok) {
          onSuccess?.();
        } else {
          console.error("Google login failed", result?.error);
        }
      } catch (error) {
        console.error("Error during Google sign-in", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess]
  );

  useEffect(() => {
    const win = window as GoogleWindow;

    if (win.google && isOpen) {
      // Aggressively cancel any existing One Tap flows
      try {
        win.google.accounts?.id?.cancel?.();
        win.google.accounts?.id?.disableAutoSelect?.();
      } catch {
        // Ignore errors
      }

      if (!googleInitFlag) {
        win.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
          callback: handleGoogleLogin,
          auto_select: false,
          cancel_on_tap_outside: false,
          use_fedcm_for_prompt: false,
        });
        googleInitFlag = true;
      }

      const timeoutId = setTimeout(() => {
        const buttonElement = document.getElementById("googleSignInButton");
        if (
          buttonElement &&
          win.google?.accounts?.id &&
          buttonRenderCount < MAX_RENDER_ATTEMPTS
        ) {
          // Force clear and prevent multiple renders
          buttonElement.innerHTML = "";
          buttonElement.setAttribute("data-rendered", "false");

          try {
            win.google.accounts.id.renderButton(buttonElement, {
              theme: "outline",
              size: "large",
              text: "continue_with",
              shape: "rectangular",
              locale: "en",
            });
            buttonElement.setAttribute("data-rendered", "true");
            buttonRenderCount++;

            // Force English on any Google elements after render
            setTimeout(forceEnglishOnGoogleElements, 200);
          } catch (error) {
            console.warn("Google button render failed:", error);
          }
        }
      }, 100);

      // Set up a mutation observer to watch for any Google language changes
      const observer = new MutationObserver(() => {
        forceEnglishOnGoogleElements();
      });

      // Observe changes to the document body
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src", "href"],
      });

      // Add window-level event listener to prevent Google language detection
      const preventLanguageChange = (event: Event) => {
        const target = event.target as HTMLElement;
        if (target && target.closest('[id*="google"], iframe[src*="google"]')) {
          setTimeout(forceEnglishOnGoogleElements, 50);
        }
      };

      window.addEventListener("focus", preventLanguageChange, true);
      window.addEventListener("input", preventLanguageChange, true);

      // Cleanup function
      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
        window.removeEventListener("focus", preventLanguageChange, true);
        window.removeEventListener("input", preventLanguageChange, true);
      };
    }
  }, [isOpen, handleGoogleLogin]);

  return (
    <div className="relative min-h-[40px] w-full">
      <div
        id="googleSignInButton"
        className="flex min-h-[40px] w-full items-center justify-center"
      ></div>

      {isLoading && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2 transform">
          <div className="h-5 w-5 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
