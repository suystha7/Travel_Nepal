interface IEndpoints {
  AUTH: {
    REGISTER: string;
    SIGN_UP_VERIFY_OTP: string;
    SIGN_IN_GOOGLE: string;

    LOGIN: string;
    LOGIN_BY_OTP: string;
    LOGIN_BY_PASSWORD: string;

    VERIFY_OTP: string;
    RESEND_OTP: string;

    REFRESH_TOKEN: string;
    FORGET_PASSWORD: string;
    FORGET_OTP_VERIFY: string;
    RESET_PASSWORD: string;
    CHANGE_PASSWORD: string;
  };

  CONTACT: string;
  FAQ: string;

  ORGANIZATION: {
    LIST: string;
    SOCIAL_MEDIA: string;
  };

  BLOG: {
    LIST: string;
    DETAILS: string;
  };

  PACKAGE: {
    LIST: string;
    BY_CATEGORY: string;
    DETAILS: string;
    CATEGORY: string;
    CITY: string;
  };

  ABOUT: {
    ABOUT_US: string;
    TESTIMONIAL: string;
    MISSION_VISION: string;
    WHY_US: string;
    TEAM: string;
  };

  SUBSCRIBE: string;

  REVIEW: {
    ADD_RATING: string;
    GET_REVIEWS: string;
  }

  BREADCRUMB: {
    HOME: string;
    PACKAGE: string;
    ABOUT_US: string;
    CONTACT_US: string;
    BLOG: string;
  };
  TOP_TOUR: string;
  TOP_DEAL: string;

  SEO: {
    HOME: string;
    ABOUT_US: string;
    CONTACT_US: string;
    RESERVATION: string;
    BLOG: string;
    PRIVACY_POLICY: string;
    REFUND_POLICY: string;
    PACKAGE: string;
  };
}
export const endpoints: IEndpoints = {
  AUTH: {
    REGISTER: "/auth/signup",
    SIGN_UP_VERIFY_OTP: "/auth/verify-register-otp/",
    SIGN_IN_GOOGLE: "/auth/google-signin",

    LOGIN: "/auth/login",
    LOGIN_BY_OTP: "/auth/otp-login/",
    LOGIN_BY_PASSWORD: "/auth/signin",

    VERIFY_OTP: "/auth/verify-otp/",
    RESEND_OTP: "/auth/resend-otp/",

    REFRESH_TOKEN: "/auth/token-refresh/",
    FORGET_PASSWORD: "/auth/forgot-password",
    FORGET_OTP_VERIFY: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/set-password",
    CHANGE_PASSWORD: "/auth/change/password",
  },

  CONTACT: "/contact",
  FAQ: "/faq",

  ORGANIZATION: {
    LIST: "/organization",
    SOCIAL_MEDIA: "/social-media",
  },

  BLOG: {
    LIST: "/blog",
    DETAILS: "/blog/detail/",
  },

  PACKAGE: {
    LIST: "/package",
    CATEGORY: "/category",
    CITY: "/city",
    BY_CATEGORY: "/package/category/",
    DETAILS: "/packages/holiday-packages/detail/",
  },
  TOP_TOUR: "/package?is_top_tour=true",
  TOP_DEAL: "/package?is_top_deals=true",

  SUBSCRIBE: "/subscribe",

  REVIEW: {
    ADD_RATING: "/review",
    GET_REVIEWS: "/review",
  },

  ABOUT: {
    ABOUT_US: "/about-us",
    TESTIMONIAL: "/testimonial",
    TEAM: "/team",
    MISSION_VISION: "/mission-vision",
    WHY_US: "/why-us",
  },

  BREADCRUMB: {
    HOME: "/breadcrumb?type=home",
    PACKAGE: "/breadcrumb?type=package",
    ABOUT_US: "/breadcrumb?type=about-us",
    CONTACT_US: "/breadcrumb?type=contact-us",
    BLOG: "/breadcrumb?type=blog",
  },

  SEO: {
    HOME: "/static-seo?seo_for=home",
    ABOUT_US: "/static-seo?seo_for=about-us",
    CONTACT_US: "/static-seo?seo_for=contact-us",
    RESERVATION: "/static-seo?seo_for=reservation",
    BLOG: "/static-seo?seo_for=blog",
    PRIVACY_POLICY: "/static-seo?seo_for=privacy-policy",
    REFUND_POLICY: "/static-seo?seo_for=refund-policy",
    PACKAGE: "/static-seo?seo_for=package",
  },
};

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_API_URL) {
  console.error(
    "❌ CRITICAL: NEXT_PUBLIC_API_URL is not set! Check Vercel environment variables."
  );
  console.error("Current value:", BASE_API_URL);
}
