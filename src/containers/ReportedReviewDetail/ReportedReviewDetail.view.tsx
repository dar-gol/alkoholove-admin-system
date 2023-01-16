import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { IReportedReview } from "../../@types/reportedReview";
import { IUser } from "../../@types/users";
import Indicator from "../../components/Indicator/Indicator";
import TextInput from "../../components/Inputs/TextInput";
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
  CriticalBar,
  InfoBar,
  WarnBar,
  GreenBar,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import { getDate } from "../../utils/utils";

interface Props {
  onCollapse?: () => void;
  collapse?: boolean;
  refresh: () => void;
  closeDetails: () => void;
}

const ReportedReviewDetail = ({
  onCollapse = () => {},
  collapse = undefined,
  refresh,
  closeDetails,
}: Props) => {
  const theme = useTheme() as { palette: { [k: string]: string } };
  const { id } = useParams();
  const [banReason, setBanReason] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [review, setReview] = useState<IReportedReview | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenFinish, setIsOpenFinish] = useState<boolean>(false);
  const [isHideComment, setIsHideComment] = useState<boolean>(true);
  const { send } = useAuthReq(
    "GET",
    `${API}${URL.REPORTED_REVIEW}/${id}`,
    null,
    {
      "Content-Type": "application/json",
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

  const banReasonChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setIsError(false);
    setBanReason(e.currentTarget.value);
  };

  const banReview = async () => {
    if (!banReason) {
      setIsError(true);
      return;
    }
    setIsError(false);
    try {
      await send({
        method: "PUT",
        body: JSON.stringify({
          reason: banReason,
        }),
      });
    } catch (e) {
      setIsHideComment(false);
    }
    setIsOpenFinish(true);
    setIsOpen(false);
  };

  const handleFinishModal = () => {
    refresh();
    closeDetails();
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
                  <Value>
                    <Text
                      as="a"
                      type="body"
                      weight="medium"
                      size="large"
                      href={`/user/${review.user_id}`}
                      color={theme.palette.Secondary70}
                    >
                      {review.username}
                    </Text>
                  </Value>
                </Tuple>
                <Tuple>
                  <Key>Recenzja </Key>
                  <Value>{review.review}</Value>
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
        <Row margin="20px 0 0 0">
          <TextInput
            state={isError ? "error" : ""}
            error="Należy podać powód ukrycia komentarza."
            name="banReason"
            value={banReason}
            onChange={banReasonChange}
            title="Powód ukrycia komentarza"
            required
            placeholder="Niepoprawna treść"
          />
        </Row>
        <Col margin="20px 0 0 0" justifyContent="center" gap="30px">
          <BtnSecondary onClick={() => banReview()}>
            Tak, chcę ukryć ten komentarz.
          </BtnSecondary>
          <BtnPrimary onClick={() => setIsOpen(false)}>
            Nie, nie chcę ukryć tego komentarza.
          </BtnPrimary>
        </Col>
      </Modal>
      <Modal isOpen={isOpenFinish} onClose={handleFinishModal}>
        <ModalTitle>Ukrywanie komentarza</ModalTitle>
        <CriticalBar visible={!isHideComment}>
          <span className="icon-Error" />
          <p>Niestety, nie udało nam sie ukryć komentarza.</p>
        </CriticalBar>
        <InfoBar margin="0 0 20px 0" visible={isHideComment}>
          <span className="icon-Info" />
          <p>Komentarz został ukryty.</p>
        </InfoBar>
        <Col margin="20px 0 0 0" justifyContent="center" gap="30px">
          <BtnPrimary onClick={handleFinishModal}>Rozumiem.</BtnPrimary>
        </Col>
      </Modal>
    </>
  );
};

export default ReportedReviewDetail;
