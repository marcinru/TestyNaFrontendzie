import { rest } from "msw";
import { setupServer } from "msw/node";
import { API_URL } from "../api/axios";

export const server = setupServer(
  rest.get(`${API_URL}/comments/`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const prodId = query.get("productId");
    let result = [];

    switch (prodId) {
      case "1":
        result = [
          {
            id: "1",
            productId: prodId,
            owner: "Piotr",
            comment: "Te buty są mega super!",
            date: "2021-02-10 10:30",
          },
          {
            id: "2",
            productId: prodId,
            owner: "Wincenty",
            comment: "Te buty są mega słabe!!",
            date: "2021-02-10 15:30",
          },
        ];
        break;
      case "2":
        return res((_res) => {
          _res.status(400);
          return _res;
        });
      default:
        break;
    }

    return res(ctx.json({ data: result }));
  }),
);
