import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IReportedReview } from "../../@types/reportedReview";
import { IUser } from "../../@types/users";
import Indicator from "../../components/Indicator/Indicator";
import {
  BtnSecondary,
  Col,
  Key,
  ListContainer,
  ListTitle,
  ListWrapper,
  ScrollContent,
  Tuple,
  Value,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import { getDate } from "../../utils/utils";

interface Props {
  onCollapse?: () => void;
  collapse?: boolean;
}

const ReportedReviewDetail = ({
  onCollapse = () => {},
  collapse = undefined,
}: Props) => {
  const { id } = useParams();
  const [review, setReview] = useState<IReportedReview | null>(null);
  const { send } = useAuthReq(
    "GET",
    `${API}${URL.REPORTED_REVIEW}/${id}`,
    null,
    {
      accept: "application/json",
    }
  );
  const getReview = () => {
    send({})
      .then((data: Response) => data.json())
      .then((data: IReportedReview) => {
        setReview(data);
      });
  };

  useEffect(() => getReview(), [id]);
  return (
    <ListContainer>
      <Indicator
        visible={collapse !== undefined}
        size={50}
        top="10px"
        left="-25px"
        onClick={onCollapse}
        icon={`icon-chevron-${collapse ? "right" : "left"}`}
        type="secondary"
      />
      <ListWrapper>
        <ListTitle>Szczegółowe informacje</ListTitle>
        <ScrollContent padding="0 30px">
          {review && (
            <Col>
              <Tuple>
                <Key>Identyfikator zgłoszenia </Key>
                <Value>{review.id}</Value>
              </Tuple>
              <Tuple>
                <Key>Komentarz stworzony przez </Key>
                <Value>{review.username}</Value>
              </Tuple>
              <Tuple>
                <Key>Komentarz stworzony przez (ID) </Key>
                <Value>{review.user_id}</Value>
              </Tuple>
              <Tuple>
                <Key>Ocena alkoholu </Key>
                <Value>{review.rating}</Value>
              </Tuple>
              <Tuple>
                <Key>Data utworzenia komentarza </Key>
                <Value>{getDate(review.date)}</Value>
              </Tuple>
              <Tuple>
                <Key>ID alkoholu </Key>
                <Value>{review.alcohol_id}</Value>
              </Tuple>
              <Tuple>
                <Key>Ilość zgłoszeń </Key>
                <Value>{review.report_count}</Value>
              </Tuple>
              <Tuple>
                <Key>Uzytkownicy którzy zgłosili komentarz</Key>
                <Value>{review.reporters.join(", ")}</Value>
              </Tuple>
            </Col>
          )}
        </ScrollContent>
      </ListWrapper>
    </ListContainer>
  );
};

export default ReportedReviewDetail;
