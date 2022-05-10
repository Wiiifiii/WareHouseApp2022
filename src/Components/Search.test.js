import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { act } from "@testing-library/react";
import Search from "./Search";

describe("Search Component test", () => {
  it("render test", () => {
    //Rendering the component we want to test
    //Finding the elements
    const { getByTestId } = render(<Search />);
    //Assertion
    act(async () => {
      const button = getByTestId("bsearch");
      const table = getByTestId("bsearch");
      await fireEvent.click(button);
      expect(button).toBeTruthy();
      expect(table).toBeInTheDocument();
    });
  });
});