import React from "react";
import { TFunction, useTranslation } from "react-i18next";
import { getPromotionDuration } from "../../utils/getPromotionDuration";
import { Promotion } from "../../types/Promotion";
import {
  PromotionDurationOutput,
  PromotionDurationType,
} from "../../types/PromotionDurationType";
import { Time } from "../../types/Time";

type PromotionDurationProps = {
  promotion: Promotion;
};
export const PromotionDuration = ({
  promotion,
}: PromotionDurationProps): JSX.Element => {
  const { t } = useTranslation();
  const promotionDuration = getPromotionDuration(new Date(), promotion.dateEnd);
  return <div>{getPromotionDurationInText(promotionDuration, t)}</div>;
};

const getPromotionDurationInText = (
  promotionDuration: PromotionDurationOutput,
  translate: TFunction
): string => {
  switch (promotionDuration.type) {
    case PromotionDurationType.days: {
      return translate("The promotion runs for about {{value}} days.", {
        value: promotionDuration.value,
      });
    }
    case PromotionDurationType.time:
      return `${(promotionDuration.value as Time).hours}:${
        (promotionDuration.value as Time).minutes
      }:${(promotionDuration.value as Time).seconds}`;
    case PromotionDurationType.hours:
      return translate("The promotion runs for about {{value}} hours.", {
        value: promotionDuration.value,
      });
    case PromotionDurationType.weeks:
      return translate("The promotion runs for about {{value}} weeks.", {
        value: promotionDuration.value,
      });
    case PromotionDurationType.months:
      return translate("The promotion runs for about {{value}} months.", {
        value: promotionDuration.value,
      });
    case PromotionDurationType.finished:
      return translate("Promotion already finished.", {
        value: promotionDuration.value,
      });
    default:
      return "";
  }
};
