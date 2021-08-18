import { render, screen, waitFor } from "test-utils";
import React from "react";
import { CommentsWrapper } from "../Comments";

describe("<Comments/>", () => {
  it("renders information about no comments yet when these do no exist", async () => {
    const prodId = "3";
    render(<CommentsWrapper productId={prodId} />);
    await waitFor(() => expect(screen.getByText(/no comments yet/i)));
  });

  it("renders list of comments when these provided", async () => {
    const prodId = "1";
    render(<CommentsWrapper productId={prodId} />);
    await waitFor(() => {
      expect(screen.getByText("Te buty są mega super!"));
      expect(screen.getByText("Te buty są mega słabe!!"));
    });
  });

  it("displays error message when something wrong happened with request", async () => {
    const prodId = "2";
    render(<CommentsWrapper productId={prodId} />);
    await waitFor(() =>
      expect(
        screen.getByText(
          "Something wrong happened with comments feature. Please try again.",
        ),
      ),
    );
  });
});
