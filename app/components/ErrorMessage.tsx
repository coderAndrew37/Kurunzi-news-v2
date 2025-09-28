import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

interface ErrorMessageProps {
  error: string | undefined | null;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  const [visible, setVisible] = useState(error !== null && error !== undefined);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {visible && (
        <Callout.Root color="red">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            <b>Error</b>
            <div>{error}</div>
          </Callout.Text>
        </Callout.Root>
      )}
    </>
  );
};

export default ErrorMessage;
