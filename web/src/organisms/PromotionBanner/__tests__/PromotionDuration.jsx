import React from 'react';
import { render, screen } from 'test-utils';
import { PromotionDuration } from '../PromotionDuration';

describe('PromotionDuration', () => {
    const getPromotion = dateEnd => ({
        id: '1',
        name: 'Test promotion 1',
        description: {
            pl: 'WIELKA PROMOCJA!',
            en: 'BIG SALE',
        },
        dateStart: new Date('2021-02-20'),
        dateEnd,
        discount: {
            code: 'BIG_SALE_20',
            percentage: 20,
        },
    });

    const mockToday = new Date('2021-06-15 18:00');
    const endDateIn3hours = new Date('2021-06-15 21:00');
    const endDateIn13hours = new Date('2021-06-16 7:00');
    const endDateIn5days = new Date('2021-06-20 20:00');
    const endDateIn3weeks = new Date('2021-07-07');
    const endDateIn2months = new Date('2021-08-15');
    const endDatePassed = new Date('2021-06-14');

    it('renders promotion duration text according to a given end date', () => {
        const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockToday);

        const promotion3hours = getPromotion(endDateIn3hours);
        const { rerender } = render(<PromotionDuration promotion={promotion3hours}/>);
        expect(screen.getByText('3:0:0')).toBeDefined();

        const promotion13hours = getPromotion(endDateIn13hours);
        rerender(<PromotionDuration promotion={promotion13hours}/>);
        expect(screen.getByText('The promotion runs for about 13 hours.')).toBeDefined();

        const promotion5days = getPromotion(endDateIn5days);
        rerender(<PromotionDuration promotion={promotion5days}/>);
        expect(screen.getByText('The promotion runs for about 5 days.')).toBeDefined();

        const promotion3weeks = getPromotion(endDateIn3weeks);
        rerender(<PromotionDuration promotion={promotion3weeks}/>);
        expect(screen.getByText('The promotion runs for about 3 weeks.')).toBeDefined();

        const promotion2months = getPromotion(endDateIn2months);
        rerender(<PromotionDuration promotion={promotion2months}/>);
        expect(screen.getByText('The promotion runs for about 2 months.')).toBeDefined();

        const outdatedPromotion = getPromotion(endDatePassed);
        rerender(<PromotionDuration promotion={outdatedPromotion}/>);
        expect(screen.getByText('Promotion already finished.')).toBeDefined();

        spy.mockRestore();
    });
});
