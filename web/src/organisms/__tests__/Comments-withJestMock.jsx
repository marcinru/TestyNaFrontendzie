import { render, screen, waitFor } from "test-utils";
import React from "react";
import { CommentsWrapper } from "../Comments";
import { getComments as mockGetComments } from "../../api/api";

jest.mock("../../api/api");

describe("<Comments/>", () => {
  it("renders information about no comments yet when these do no exist", async () => {
    mockGetComments.mockResolvedValueOnce([]);
    const prodId = "1";
    render(<CommentsWrapper productId={prodId} />);
    expect(mockGetComments).toHaveBeenCalledWith(prodId);
    expect(mockGetComments).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByText(/no comments yet/i)));
  });

  it("renders list of comments when these provided", async () => {
    mockGetComments.mockResolvedValueOnce([
      {
        id: "1",
        productId: "1",
        owner: "Piotr",
        comment: "Te buty są mega super!",
        date: "2021-02-10 10:30",
      },
      {
        id: "2",
        productId: "1",
        owner: "Wincenty",
        comment: "Te buty są mega słabe!!",
        date: "2021-02-10 15:30",
      },
    ]);
    const prodId = "1";
    render(<CommentsWrapper productId={prodId} />);

    await waitFor(() => {
      expect(screen.getByText("Te buty są mega super!"));
      expect(screen.getByText("Te buty są mega słabe!!"));
    });
  });

  it("displays error message when something wrong happened with request", async () => {
    mockGetComments.mockRejectedValueOnce(new Error("Something wrong"));
    const prodId = "1";
    render(<CommentsWrapper productId={prodId} />);
    await waitFor(() =>
      expect(
        screen.getByText(
          "Something wrong happened with comments feature. Please try again."
        )
      )
    );
  });
});
