import React, { useState, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { BtnPrimary, BtnSecondary, Row } from '../../styles/global.styled';
import { API } from '../../utils/constant';
import { post } from '../../utils/fetch';
import Modal from '../modal/Modal';
import Select from '../Select/select';
import SimpleInput from '../SimpleInput/simpleInput';
import { UserContextType } from '../../@types/user';
import { UserContext } from '../../context/userContext';
import { ModalContainer, ModalTitle } from './regionInput.styled';

const RegionInput = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm({});

  const submitModal = (data: any) => {
    const {
      country_id: { value },
      name,
    } = data;
    post({
      url: `${API}/regions`,
      body: {
        name,
        country_id: value,
      },
      header: {
        Authorization: `Bearer ${user.access_token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  };
  return (
    <Row alignItems="end" gap="10px">
      <Select name="region_id" show_name="Region" api="regions" />
      <BtnSecondary type="button" onClick={() => setIsOpen(true)}>
        Dodaj
      </BtnSecondary>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FormProvider {...form}>
          <ModalContainer
            onSubmit={(e) => {
              e.stopPropagation();
              form.handleSubmit(submitModal)(e);
            }}
          >
            <ModalTitle>Stwórz nowy region:</ModalTitle>
            <Select
              name="country_id"
              show_name="Kraj"
              api="countries"
              isMulti={false}
            />
            <SimpleInput name="name" show_name="Region" />
            <Row alignItems="center" gap="10px" margin="20px 0 0 0">
              <BtnPrimary type="submit">Dodaj</BtnPrimary>
              <BtnSecondary type="button" onClick={() => setIsOpen(false)}>
                Wyjdź
              </BtnSecondary>
            </Row>
          </ModalContainer>
        </FormProvider>
      </Modal>
    </Row>
  );
};

export default RegionInput;
