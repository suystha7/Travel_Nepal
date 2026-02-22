"use client";

import { useNewsletter } from "./newsLetter.hook";

const NewsLetter = () => {
  const { formik, isLoading } = useNewsletter();

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit}>
        <div className="items-center">
          <input
            name="email"
            type="email"
            placeholder="Enter your email address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="text-white my-4 p-2 rounded-md border-2 border-white"
          />
          <button
            type="submit"
            className={`typography-paragraph-small ${
              isLoading || formik.isSubmitting
                ? "cursor-not-allowed"
                : "cursor-pointer bg-white text-primary-500 hover:border-white font-semibold py-3 px-2 rounded-lg text-sm ml-2"
            }`}
            disabled={isLoading || formik.isSubmitting}
          >
            {isLoading || formik.isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {formik.touched.email && formik.errors.email && (
          <div className="mt-1 text-sm text-red-400">{formik.errors.email}</div>
        )}
      </form>
    </div>
  );
};

export default NewsLetter;
