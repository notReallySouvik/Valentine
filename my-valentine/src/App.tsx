import React, { useState } from "react"
import FirstPage from "./FirstPage"
import SecondPage from "./SecondPage"

export default function App() {
  const [page, setPage] = useState<"first" | "second">("first")

  return (
    <>
      {page === "first" && <FirstPage onNext={() => setPage("second")} />}
      {page === "second" && <SecondPage onNext={() => setPage("first")} />}
    </>
  )
}
