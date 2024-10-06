import React from "react";
import { Helmet } from "react-helmet-async";

type Props = {
  children: React.ReactNode;
  title: string;
  meta?: any;
};

const Page = ({ children, title = "", meta }: Props) => (
  <>
    <Helmet>
      <title>{`${title}`}</title>
      {meta}
    </Helmet>
    <>{children}</>
  </>
);

export default Page;
