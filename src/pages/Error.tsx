import { FC } from "react";

interface ErrorProps {
  type: "unknownError" | "notFound";
}

export const Error: FC<ErrorProps> = ({ type }) => <div>Error</div>;
