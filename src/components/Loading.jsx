import React from "react";

function Loading({ loading, error, children }) {
  const loadingDiv = <p className="text-center">Loading (^-^) ...</p>;
  const errorDiv = <p className="text-center">Error (-_-)</p>;
  const elementType = children.type?.render?.displayName;

  const renderHandler = () => {
    if (elementType === "Button") {
      const cloneButton = React.cloneElement(
        children,
        { disabled: true },
        "Loading..."
      );
      return (
        <>
          {loading ? (
            cloneButton
          ) : error ? (
            <>
              {children} <p>{error}</p>
            </>
          ) : (
            children
          )}
        </>
      );
    }
    return <>{loading ? loadingDiv : error ? errorDiv : children}</>;
  };

  return renderHandler();
}

export default Loading;
