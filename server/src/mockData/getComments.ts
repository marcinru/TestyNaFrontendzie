import { Comments } from '../services/comments/comments.class';
import { Comment } from '../types/Comment';

const comments: Comment[] = [
  {
    _id: '1',
    productId: '1',
    owner: 'Piotr',
    comment: 'Te buty są mega super!',
    date: '2021-02-10 10:30',
  },
  {
    _id: '2',
    productId: '1',
    owner: 'Wincenty',
    comment: 'Te buty są mega słabe!!',
    date: '2021-02-10 15:30',
  },
];

export const getCommentsForProduct = (id: string) => {
  return comments.filter((comment) => comment.productId === id);
};
