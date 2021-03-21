import React from "react";

export default function MessageBox({ children, variant }) {
  return <div className={`alert alert-${variant || "info"}`}>{children}</div>;
}
