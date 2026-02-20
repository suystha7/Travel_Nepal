type FieldError = {
  path: string;
  msg: string;
};

type ErrorResponse = {
  data: {
    errors: FieldError[];
    message: string;
  };
};

export type ApiResponse = {
  error: ErrorResponse;
  data?: {
    status: string;
    message: string;
  };
};
