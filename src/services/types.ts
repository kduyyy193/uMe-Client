export type ApiResponse<T> = {
  data?: T;
  msg: string;
  count?: number;
  pages?: number;
  unread?: number;
};

export type ApiError = {
  msg: string;
  status?: number;
};

export type ApiParamsDefault = {
  page?: number;
  perPage?: number;
  fullTextSearch?: string;
  sort?: string;
  /*
    JSON stringtify
    {
     [key: string]: string;
    };
     */
  filter?: string;
  /*
    JSON stringtify
    {
     [key: string]: string;
    };
     */
};

export type TAcction = {
  allowEdit?: boolean;
  allowDelete?: boolean;
  allowApprove?: boolean;
  allowReject?: boolean;
};
