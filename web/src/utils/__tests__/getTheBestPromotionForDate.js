import { getTheBestPromotionForDate } from '../getTheBestPromotionForDate';

describe('getTheBestPromotionForDate', () => {
    const generateJunePromotions = (percents) => {
        return percents.map((percent, index) => ({
            id: (index + 1).toString(),
            name: `${percent}% discount in June`,
            dateStart: new Date('2021-06-01'),
            dateEnd: new Date('2021-06-30'),
            discount: {
                code: `SUMMER${percent}`,
                percentage: percent
            }
        }));
    };

    it('should return null when there are no promotions available', () => {
        const date = new Date('2021-11-21');
        const promotions = generateJunePromotions([20, 30]);

        expect(getTheBestPromotionForDate(date, [])).toBeNull();
        expect(getTheBestPromotionForDate(date, promotions)).toBeNull();
    });

    it('should return the only available promotion when there is one for a given date', () => {
        const date = new Date('2021-06-19');
        const promotions = generateJunePromotions([20]);

        expect(getTheBestPromotionForDate(date, promotions)).toEqual(promotions[0]);
    });

    it('should return the best promotion from available promotions for a given date', () => {
        const date = new Date('2021-06-19');
        const promotions = generateJunePromotions([20, 40, 30]);

        expect(getTheBestPromotionForDate(date, promotions)).toEqual(promotions[1]);
    });
});
