import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { IReportedReview } from "../../@types/reportedReview";
import { IUser } from "../../@types/users";
import Indicator from "../../components/Indicator/Indicator";
import Modal from "../../components/modal/Modal";
import { ModalTitle } from "../../components/modal/Modal.styled";
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
  Text,
  Row,
  BtnGhost,
  WarnText,
  BtnPrimary,
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
  const theme = useTheme() as { palette: { [k: string]: string } };
  const { id } = useParams();
  const [review, setReview] = useState<IReportedReview | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const banReview = () => {
    send({
      method: "PUT",
      url: `${API}${URL.REPORTED_REVIEW}`,
    });
  };

  const reportersLink = (reporters: string[]) =>
    reporters.map((reporter) => (
      <Text
        as="a"
        type="body"
        weight="medium"
        size="large"
        href={`/user/${reporter}`}
        color={theme.palette.Secondary70}
      >
        {reporter}
      </Text>
    ));

  useEffect(() => getReview(), [id]);
  return (
    <>
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
                  <Value>
                    <Text
                      as="a"
                      type="body"
                      weight="medium"
                      size="large"
                      href={`/user/${review.user_id}`}
                      color={theme.palette.Secondary70}
                    >
                      {review.user_id}
                    </Text>
                  </Value>
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
                  <Value>{reportersLink(review.reporters)}</Value>
                </Tuple>
                <Row margin="20px 0 0 0" gap="20px" justifyContent="end">
                  <BtnSecondary
                    padding="0 20px"
                    onClick={() => setIsOpen(true)}
                  >
                    Ukryj komentarz
                  </BtnSecondary>
                </Row>
              </Col>
            )}
          </ScrollContent>
        </ListWrapper>
      </ListContainer>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle>Ukrywanie komentarza</ModalTitle>
        <WarnText>Czy na pewno chcesz ukryć ten komentarz?</WarnText>
        <Col>
          <Tuple>
            <Key>Identyfikator zgłoszenia</Key>
            <Value>{review?.id}</Value>
          </Tuple>
          <Tuple>
            <Key>Komentarz stworzony przez</Key>
            <Value>{review?.username}</Value>
          </Tuple>
        </Col>
        <Col margin="20px 0 0 0" justifyContent="center" gap="30px">
          <BtnSecondary onClick={() => banReview()}>
            Tak, chcę ukryć ten komentarz.
          </BtnSecondary>
          <BtnPrimary onClick={() => setIsOpen(false)}>
            Nie, nie chcę ukryć tego komentarza.
          </BtnPrimary>
        </Col>
      </Modal>
    </>
  );
};

export default ReportedReviewDetail;
