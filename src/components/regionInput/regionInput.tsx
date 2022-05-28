import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { BtnPrimary, BtnSecondary, Row } from '../../styles/global.styled';
import { API } from '../../utils/constant';
import Modal from '../modal/Modal';
import Select from '../Select/select';
import SimpleInput from '../SimpleInput/simpleInput';
import useAuthReq from '../../utils/hooks/useReq';
import { ModalTitle } from '../modal/Modal.styled';

const RegionInput = () => {
  const { send } = useAuthReq('POST', `${API}/regions`, '');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm({});

  const submitModal = ({name, country_id: { value }}: any) =>
    send({ body: JSON.stringify({ name, country_id: value }) })
  
  return (
    <Row alignItems="end" gap="10px">
      <Select name="region_id" show_name="Region" api="regions" />
      <BtnSecondary type="button" onClick={() => setIsOpen(true)}>
        Dodaj
      </BtnSecondary>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FormProvider {...form}>
          <form
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
          </form>
        </FormProvider>
      </Modal>
    </Row>
  );
};

export default RegionInput;
